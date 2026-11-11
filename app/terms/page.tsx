import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = { title: "Terms of Sale", description: "The terms that apply when you buy the Levitation Pod from It Flew! at itflew.com.", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <LegalPage title="Terms of Sale" updated="November 9, 2026">
      <p>These terms apply to purchases made on itflew.com. By placing an order you agree to them.</p>
      <h2>Orders and pricing</h2>
      <p>Prices are shown in US dollars and include the item price. Standard shipping is a flat $7.00 per order and is shown at checkout before you pay. We may cancel an order if a product is unavailable or a pricing error occurs, in which case you&apos;ll be refunded in full.</p>
      <h2>Payment</h2>
      <p>Payments are processed securely by Stripe. Your order is confirmed once payment succeeds and you receive a confirmation email with your order number.</p>
      <h2>Shipping and returns</h2>
      <p>See <Link href="/shipping-returns">Shipping &amp; Returns</Link>.</p>
      <h2>Using the product</h2>
      <p>The Levitation Pod is a magic prop intended for entertainment. Use it with care; the thread and needle tip are small and not suitable for young children.</p>
      <h2>Discounts</h2>
      <p>The 10% welcome offer applies once per customer to the first order placed with the email address used to join our list, and can&apos;t be combined with other offers.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </LegalPage>
  );
}
