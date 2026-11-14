import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ITR, formatPrice } from "@/lib/products";
import { CONTACT_EMAIL, ORDERS_EMAIL, SUPPORT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "About It Flew! | Makers of the Levitation Pod" },
  description:
    "It Flew! is a magic brand based in Stockholm, Sweden. We made the Levitation Pod, the trick behind the viral telekinesis prank, so anyone can make things fly without learning magic. Contact, returns and support inside.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About It Flew!",
    description: "A Stockholm, Sweden magic brand. We made the Levitation Pod so anyone, even a total beginner, can make things fly.",
    url: "/about",
  },
};

const WHY: [string, string][] = [
  ["The tutorial comes with it", "You get the pod and you learn the trick. A video tutorial and four illustrated steps take you from opening the box to your first levitation."],
  ["Ships within 48 hours", "Every order is dispatched in 24–48 hours with flat $7 shipping, however many pods you buy. You see your delivery dates before you enter any details."],
  ["30 days to change your mind", "Return unused pods within 30 days of delivery for a full refund of the item price. If one arrives damaged, we replace it free."],
  ["Checkout you can trust", "Payments run through Stripe with bank-level encryption. Apple Pay and all major cards are accepted, and we never see or store your card."],
  ["Real people answer", "Questions before or after you buy go to the It Flew! team, by chat on any page or by email. No bots, no ticket maze."],
  ["One product, done properly", "We make the Levitation Pod and nothing else. Every photo, video and instruction on this site is about the exact pod you receive."],
];

const DIRECT: [string, string, string][] = [
  ["What arrives", "The It Flew! Levitation Pod shown on this site", "Depends on the seller"],
  ["Learning the trick", "Video tutorial and step-by-step cards", "Often the pod alone"],
  ["Help when you're stuck", "The It Flew! team, by chat or email", "A marketplace help form"],
  ["Returns", "30 days, handled by us", "Varies by seller"],
];

export default function About() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About It Flew!",
      url: "https://itflew.com/about",
      mainEntity: { "@id": "https://itflew.com/#organization" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "It Flew!", item: "https://itflew.com" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://itflew.com/about" },
      ],
    },
  ];

  return (
    <main className="ab">
      <section className="ab-hero">
        <h1>About It Flew!</h1>
        <p>
          It Flew! is a magic brand based in Stockholm, Sweden. We make the Levitation Pod, the trick behind the viral telekinesis prank, so that anyone can make things fly.
        </p>
      </section>

      <section className="ab-story">
        <div className="ab-photo">
          <Image src="/product/reel-angle-v2.webp" alt="The It Flew! Levitation Pod" width={1896} height={2528} unoptimized />
        </div>
        <div className="ab-copy">
          <h2>Magic without the learning curve</h2>
          <p>
            Most magic asks you to learn sleights, practise for weeks and memorise routines. We wanted the opposite: a trick anyone can pull off the first time they try, even if they have never done magic in their life.
          </p>
          <p>
            That is why we made the Levitation Pod. You do not have to be a magician. Clip the pod to your jacket, attach the thread to a can, and let it fly. That is the whole trick, and it is the same one behind the telekinesis prank videos everyone is sharing.
          </p>
          <p>
            The best part is the reaction. Someone stares at the can moving on its own, then at you, and says it out loud: it flew. That moment is why we exist, so we made it our name.
          </p>
        </div>
      </section>

      <section className="ab-why">
        <h2>Why choose It Flew!</h2>
        <ul>
          {WHY.map(([t, d], i) => (
            <li key={t}>
              <span aria-hidden>{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="ab-direct">
        <h2>Why buy direct</h2>
        <p className="ab-lede">Levitation gadgets are sold in a lot of places. Here is what you get when it comes from us.</p>
        <div className="ab-table" role="table" aria-label="Buying from It Flew! compared with a marketplace listing">
          <div role="row" className="ab-tr ab-th">
            <span role="columnheader" />
            <span role="columnheader">It Flew!</span>
            <span role="columnheader">Marketplace listing</span>
          </div>
          {DIRECT.map(([k, a, b]) => (
            <div role="row" className="ab-tr" key={k}>
              <span role="rowheader">{k}</span>
              <span role="cell">{a}</span>
              <span role="cell">{b}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ab-community">
        <h2>Follow It Flew!</h2>
        <p>See the pod in action, new tricks and what people are making fly at @itflewmagic.</p>
        <a href="https://www.instagram.com/itflewmagic" target="_blank" rel="noopener noreferrer">Follow @itflewmagic</a>
      </section>

      <section className="ab-who">
        <h2>Who we are</h2>
        <dl>
          <div><dt>Company</dt><dd>It Flew!</dd></div>
          <div><dt>Based in</dt><dd>Stockholm, Sweden</dd></div>
          <div><dt>What we sell</dt><dd>One product: the Levitation Pod</dd></div>
          <div><dt>Ships to</dt><dd>Worldwide, dispatched within 48 hours</dd></div>
          <div><dt>Support</dt><dd><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></dd></div>
          <div><dt>Orders &amp; returns</dt><dd><a href={`mailto:${ORDERS_EMAIL}`}>{ORDERS_EMAIL}</a></dd></div>
          <div><dt>Everything else</dt><dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd></div>
          <div><dt>Instagram</dt><dd><a href="https://www.instagram.com/itflewmagic" target="_blank" rel="noopener noreferrer">@itflewmagic</a></dd></div>
        </dl>
        <p>Returns and delivery are explained in full on our <Link href="/shipping-returns">Shipping &amp; Returns</Link> page, and the terms of every sale are in our <Link href="/terms">Terms of Sale</Link>.</p>
      </section>

      <section className="ab-end">
        <h2>Ready to make something fly?</h2>
        <Link href="/products/levitation-pod" className="ab-buy">
          <span>Shop {ITR.name}</span>
          <span>{formatPrice(ITR.price)}</span>
        </Link>
        <p>
          Questions first? <Link href="/contact">Contact us</Link> or email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
