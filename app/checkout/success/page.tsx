import type { Metadata } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe/server";
import ClearCart from "@/components/ClearCart";
import { formatPrice } from "@/lib/products";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Success({ searchParams }: { searchParams: Promise<{ payment_intent?: string; session_id?: string }> }) {
  const { payment_intent, session_id } = await searchParams;
  let pi = null;
  let email: string | null = null;
  try {
    if (session_id && /^cs_[A-Za-z0-9_]+$/.test(session_id)) {
      const cs = await stripe().checkout.sessions.retrieve(session_id, { expand: ["payment_intent"] });
      pi = typeof cs.payment_intent === "object" ? cs.payment_intent : null;
      email = cs.customer_details?.email ?? null;
    } else if (payment_intent && /^pi_[A-Za-z0-9]+$/.test(payment_intent)) {
      pi = await stripe().paymentIntents.retrieve(payment_intent);
    }
  } catch {}
  email ??= pi?.receipt_email ?? null;
  const paid = pi?.status === "succeeded" || pi?.status === "processing";

  return (
    <main className="co co-done">
      {paid ? (
        <>
          <ClearCart />
          <p className="co-label">Order {pi!.metadata.order_number}</p>
          <h1 className="co-title">It flew. Thank you.</h1>
          <p className="co-done-text">
            We&apos;ve got your order for {pi!.metadata.qty} × Levitation Pod ({formatPrice(pi!.amount / 100)}).
            {email && <> A receipt is on its way to {email}.</>}
          </p>
          <Link href="/track" className="dr-add co-btn-link"><span>Track your order</span><span>›</span></Link>
        </>
      ) : (
        <>
          <h1 className="co-title">Payment not completed</h1>
          <p className="co-done-text">Nothing was charged. You can try again from your bag.</p>
          <Link href="/checkout" className="dr-add co-btn-link"><span>Back to checkout</span><span>›</span></Link>
        </>
      )}
    </main>
  );
}
