import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { PRIVACY_EMAIL } from "@/lib/contact";

export const metadata: Metadata = { title: "Privacy Policy", description: "How It Flew! collects, uses and protects your data when you shop at itflew.com.", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="November 9, 2026">
      <p>This policy explains what It Flew! (&ldquo;we&rdquo;) collects when you use itflew.com, why, and the choices you have.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Orders:</strong> your name, email, shipping address and order details. Card details are entered directly with our payment processor, Stripe, and never reach our servers.</li>
        <li><strong>Email list:</strong> your email address if you sign up for offers and drops.</li>
        <li><strong>Support:</strong> your email and message if you contact us.</li>
        <li><strong>Usage:</strong> if you accept analytics cookies, anonymous information about how pages are used.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To process and deliver orders, send receipts and order updates, answer your messages, send marketing emails you&apos;ve asked for, prevent fraud, and improve the site. We don&apos;t sell your personal information.</p>
      <h2>Who we share it with</h2>
      <p>Only the services that help us run the store: Stripe (payments), Supabase (database), Vercel (hosting and, with consent, analytics), and our shipping carriers. Each processes data on our behalf.</p>
      <h2>Cookies</h2>
      <p>Necessary cookies keep your bag and preferences working. Analytics cookies are only used if you choose &ldquo;Accept all&rdquo;. You can change your choice by clearing this site&apos;s data in your browser.</p>
      <h2>Your rights</h2>
      <p>You can ask for a copy of your data, ask us to correct or delete it, or unsubscribe from marketing at any time. Email <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.</p>
      <h2>Retention</h2>
      <p>We keep order records as long as required for tax and accounting, and other data only as long as needed for the purposes above.</p>
    </LegalPage>
  );
}
