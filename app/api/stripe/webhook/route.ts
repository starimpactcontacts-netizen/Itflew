import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createClient as createAdmin } from "@supabase/supabase-js";
import { stripe, webhookSecret } from "@/lib/stripe/server";
import { SUPABASE_URL } from "@/lib/supabase/config";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const raw = await req.text();
  const secret = webhookSecret();
  const sig = req.headers.get("stripe-signature");

  // Prefer the signature; if it can't be checked (missing/mismatched secret), fetch the event
  // straight from Stripe by id so a forged payload can never create an order.
  let event: Stripe.Event | null = null;
  if (secret && sig) {
    try {
      event = stripe().webhooks.constructEvent(raw, sig, secret);
    } catch {
      event = null;
    }
  }
  if (!event) {
    try {
      const id = (JSON.parse(raw) as { id?: string }).id;
      if (!id || !/^evt_[A-Za-z0-9]+$/.test(id)) throw new Error("no id");
      event = await stripe().events.retrieve(id);
    } catch {
      return NextResponse.json({ error: "unverified event" }, { status: 400 });
    }
  }

  if (event.type === "payment_intent.succeeded") {
    // always read the live PaymentIntent from Stripe
    const pi = await stripe().paymentIntents.retrieve((event.data.object as Stripe.PaymentIntent).id);
    // the Stripe account is shared with other stores: only record It Flew! orders
    if (pi.metadata.product !== "invisible-thread") return NextResponse.json({ received: true, ignored: true });
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
    if (!serviceKey) {
      console.error("webhook: SUPABASE_SERVICE_ROLE_KEY not set, order not saved", pi.id);
      return NextResponse.json({ received: true, saved: false });
    }
    const db = createAdmin(SUPABASE_URL, serviceKey, { auth: { persistSession: false } });
    const { error } = await db.from("orders").upsert(
      {
        order_number: pi.metadata.order_number ?? pi.id,
        email: (pi.receipt_email ?? "").toLowerCase(),
        status: "processing",
        quantity: Number(pi.metadata.qty) || 1,
        amount_total: pi.amount_received || pi.amount,
        currency: pi.currency,
        payment_intent: pi.id,
        shipping: pi.shipping ?? null,
      },
      { onConflict: "payment_intent" }
    );
    if (error) {
      console.error("webhook: order insert failed", error);
      return NextResponse.json({ error: "db" }, { status: 500 }); // Stripe will retry
    }
  }

  return NextResponse.json({ received: true });
}
