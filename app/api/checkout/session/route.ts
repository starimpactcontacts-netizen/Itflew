import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { priceFor, SHIPPING_CENTS } from "@/lib/pricing";

const SITE = "https://itflew.vercel.app";
import { SHIP_COUNTRIES } from "@/lib/countries";

// Stripe-hosted checkout (used until a publishable key is configured).
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { qty?: number };
    const p = priceFor(Number(body.qty) || 1, false);
    const orderNumber = "IF" + Math.floor(100000 + Math.random() * 900000);
    const meta = { product: "levitation-pod", qty: String(p.qty), order_number: orderNumber };
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      excluded_payment_method_types: ["paypal", "amazon_pay"],
      line_items: [
        {
          quantity: p.qty,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(p.subtotal / p.qty),
            product_data: { name: "Levitation Pod", description: "Small pod, one thread, endless tricks", images: [`${SITE}/product/reel-angle-v2.webp`] },
          },
        },
      ],
      shipping_address_collection: { allowed_countries: [...SHIP_COUNTRIES] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Standard shipping",
            fixed_amount: { amount: SHIPPING_CENTS, currency: "usd" },
            delivery_estimate: { minimum: { unit: "business_day", value: 7 }, maximum: { unit: "business_day", value: 12 } },
          },
        },
      ],
      allow_promotion_codes: true,
      metadata: meta,
      payment_intent_data: { metadata: meta, description: `Levitation Pod × ${p.qty}`, statement_descriptor_suffix: "ITFLEW" },
      branding_settings: {
        display_name: "IT FLEW!",
        background_color: "#ffffff",
        button_color: "#33353a",
        border_style: "rounded",
        logo: { type: "url", url: `${SITE}/wordmark-black.png` },
        icon: { type: "url", url: `${SITE}/wordmark-black.png` },
      },
      success_url: `${SITE}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE}/products/levitation-pod`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("checkout session", e);
    return NextResponse.json({ error: "Checkout is unavailable right now." }, { status: 500 });
  }
}
