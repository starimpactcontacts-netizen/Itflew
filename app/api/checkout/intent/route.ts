import { NextResponse } from "next/server";
import { stripe, publishableKey } from "@/lib/stripe/server";
import { ensureStripeSetup } from "@/lib/stripe/setup";
import { priceFor } from "@/lib/pricing";
import { admin } from "@/lib/supabase/admin";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

async function welcomeEligible(email: string | undefined) {
  if (!email || !EMAIL.test(email)) return false;
  try {
    const { data } = await admin().rpc("welcome_discount_eligible", { p_email: email });
    return data === true;
  } catch {
    return false;
  }
}

const orderNumber = () => "IF" + Math.floor(100000 + Math.random() * 900000);

// POST { qty, email?, id? } -> creates or updates the PaymentIntent. Price is always set here.
export async function POST(req: Request) {
  try {
    void ensureStripeSetup();
    if (!publishableKey()) return NextResponse.json({ hosted: true });
    const body = (await req.json().catch(() => ({}))) as { qty?: number; email?: string; id?: string };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : undefined;
    const welcome = await welcomeEligible(email);
    const p = priceFor(Number(body.qty) || 1, welcome);
    const metadata = { qty: String(p.qty), welcome: welcome ? "1" : "0", product: "levitation-pod" };

    let intent;
    if (body.id && /^pi_[A-Za-z0-9]+$/.test(body.id)) {
      const current = await stripe().paymentIntents.retrieve(body.id);
      if (current.status !== "requires_payment_method" && current.status !== "requires_confirmation") {
        return NextResponse.json({ error: "This checkout has already been used." }, { status: 409 });
      }
      intent = await stripe().paymentIntents.update(body.id, {
        amount: p.total,
        receipt_email: email && EMAIL.test(email) ? email : undefined,
        metadata: { ...current.metadata, ...metadata },
      });
    } else {
      intent = await stripe().paymentIntents.create({
        amount: p.total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        excluded_payment_method_types: ["paypal", "amazon_pay"],
        receipt_email: email && EMAIL.test(email) ? email : undefined,
        description: `Levitation Pod × ${p.qty}`,
        statement_descriptor_suffix: "ITFLEW",
        metadata: { ...metadata, order_number: orderNumber() },
      });
    }

    return NextResponse.json({
      id: intent.id,
      clientSecret: intent.client_secret,
      publishableKey: publishableKey(),
      orderNumber: intent.metadata.order_number,
      ...p,
      welcome,
    });
  } catch (e) {
    console.error("checkout intent", e);
    return NextResponse.json({ error: "Checkout is unavailable right now." }, { status: 500 });
  }
}
