import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { ORDERS_EMAIL } from "@/lib/contact";

export const metadata: Metadata = { title: "Shipping & Returns", description: "It Flew! shipping and returns: flat $7 standard shipping, dispatched within 24–48 hours, delivered in 7–12 business days, 30-day returns.", alternates: { canonical: "/shipping-returns" } };

export default function Shipping() {
  return (
    <LegalPage title="Shipping & Returns" updated="November 9, 2026">
      <h2>Shipping</h2>
      <p><strong>Standard Shipping: $7.00, 7–12 business days.</strong> One flat rate per order, however many reels you buy.</p>
      <p>Orders are fulfilled within 24–48 hours. Most orders to major metropolitan areas arrive within 5–7 days once dispatched. You&apos;ll get a confirmation email with your order number as soon as you pay.</p>
      <p>Once your order ships you can follow it on our <Link href="/track">Track your order</Link> page with your email and order number.</p>
      <h2>Returns</h2>
      <p>Changed your mind? You can return unused reels in their original packaging within 30 days of delivery for a full refund of the item price. Email <a href={`mailto:${ORDERS_EMAIL}`}>{ORDERS_EMAIL}</a> with your order number to start a return and we&apos;ll send instructions.</p>
      <p>Refunds go back to your original payment method within 5–10 business days of us receiving the return.</p>
      <h2>Damaged or missing items</h2>
      <p>If your reel arrives damaged or something is missing, email us within 14 days with a photo and your order number and we&apos;ll replace it free of charge.</p>
    </LegalPage>
  );
}
