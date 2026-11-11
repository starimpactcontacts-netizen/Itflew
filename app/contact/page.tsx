import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL, ORDERS_EMAIL, SUPPORT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = { title: "Contact", description: "Contact It Flew! about your Levitation Pod order, delivery, returns or anything else. Chat with us or email support@itflew.com.", alternates: { canonical: "/contact" } };

export default function Contact() {
  return (
    <LegalPage title="Contact us">
      <p>We read every message. The fastest way to reach us is the chat button on the side of any page, or by email.</p>
      <dl className="lg-list">
        <div><dt>Orders &amp; delivery</dt><dd><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></dd></div>
        <div><dt>Order changes &amp; returns</dt><dd><a href={`mailto:${ORDERS_EMAIL}`}>{ORDERS_EMAIL}</a></dd></div>
        <div><dt>Press, partnerships &amp; everything else</dt><dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd></div>
      </dl>
      <p>Include your order number (it starts with IF) so we can help faster. You can also <Link href="/track">track your order</Link> any time.</p>
    </LegalPage>
  );
}
