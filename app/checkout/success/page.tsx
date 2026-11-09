import type { Metadata } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe/server";
import ClearCart from "@/components/ClearCart";
import { formatPrice } from "@/lib/products";

export const metadata: Metadata = { title: "Order confirmed | It Flew!", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Success({ searchParams }: { searchParams: Promise<{ payment_intent?: string }> }) {
  const { payment_intent } = await searchParams;
  let pi = null;
  if (payment_intent && /^pi_[A-Za-z0-9]+$/.test(payment_intent)) {
    try { pi = await stripe().paymentIntents.retrieve(payment_intent); } catch {}
  }
  const paid = pi?.status === "succeeded" || pi?.status === "processing";

  return (
    <main className="co co-done">
      {paid ? (
        <>
          <ClearCart />
          <p className="co-label">Order {pi!.metadata.order_number}</p>
          <h1 className="co-title">It flew. Thank you.</h1>
          <p className="co-done-text">
            We&apos;ve got your order for {pi!.metadata.qty} × Invisible Thread ({formatPrice(pi!.amount / 100)}).
            {pi!.receipt_email && <> A receipt is on its way to {pi!.receipt_email}.</>}
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
