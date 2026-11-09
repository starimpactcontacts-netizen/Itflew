import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createClient as createAdmin } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe/server";
import { SUPABASE_URL } from "@/lib/supabase/config";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) return NextResponse.json({ error: "missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), sig, secret);
  } catch {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
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
