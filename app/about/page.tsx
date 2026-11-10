import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ITR, formatPrice } from "@/lib/products";
import { SUPPORT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "About It Flew! | The Invisible Thread Magic Brand" },
  description:
    "It Flew! is the magic brand behind Invisible Thread, a pocket-sized reel that makes everyday objects float. Why buy direct: video tutorial, 48-hour dispatch, 30-day returns and real support.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About It Flew!",
    description: "The magic brand behind Invisible Thread. One reel, one thread, and the moment everyone says: it flew.",
    url: "/about",
  },
};

const WHY: [string, string][] = [
  ["The tutorial comes with it", "You get the reel and you learn the trick. A video tutorial and four illustrated steps take you from opening the box to your first levitation."],
  ["Ships within 48 hours", "Every order is dispatched in 24–48 hours with flat $7 shipping, however many reels you buy. You see your delivery dates before you enter any details."],
  ["30 days to change your mind", "Return unused reels within 30 days of delivery for a full refund of the item price. If one arrives damaged, we replace it free."],
  ["Checkout you can trust", "Payments run through Stripe with bank-level encryption. Apple Pay and all major cards are accepted, and we never see or store your card."],
  ["Real people answer", "Questions before or after you buy go to the It Flew! team, by chat on any page or by email. No bots, no ticket maze."],
  ["One product, done properly", "We make Invisible Thread and nothing else. Every photo, video and instruction on this site is about the exact reel you receive."],
];

const DIRECT: [string, string, string][] = [
  ["What arrives", "The It Flew! Invisible Thread reel shown on this site", "Depends on the seller"],
  ["Learning the trick", "Video tutorial and step-by-step cards", "Often the reel alone"],
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
          It Flew! is the magic brand behind Invisible Thread: a pocket-sized reel that lets anyone make a can, a ring, a card or a bill rise into the air.
        </p>
      </section>

      <section className="ab-story">
        <div className="ab-photo">
          <Image src="/product/reel-angle-v2.webp" alt="The It Flew! Invisible Thread reel" width={1896} height={2528} unoptimized />
        </div>
        <div className="ab-copy">
          <h2>Two words, one reaction</h2>
          <p>
            The best magic ends the same way. Someone stares at the thing hanging in the air, then at you, and says it out loud: it flew. That reaction is the whole point of what we make, so we made it our name.
          </p>
          <p>
            Invisible Thread is the classic levitation tool that working magicians have relied on for decades, made simple. The reel clips inside your collar or jacket. You draw out a thread too fine to see, hook it to something light and lift your hands. When you are done, the thread winds back into the reel and nothing is left to find.
          </p>
          <p>
            We built It Flew! so that a complete beginner can do this on day one. That is why every reel comes with a tutorial, and why the people who made it are the ones who answer when you write.
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
        <p className="ab-lede">Invisible thread reels are sold in a lot of places. Here is what you get when it comes from us.</p>
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
        <h2>Join 4,000 on Instagram</h2>
        <p>See the reel in action, new tricks and what people are making fly at @itflewmagic.</p>
        <a href="https://www.instagram.com/itflewmagic" target="_blank" rel="noopener noreferrer">Follow @itflewmagic</a>
      </section>

      <section className="ab-end">
        <h2>Ready to make something fly?</h2>
        <Link href="/products/invisible-thread" className="ab-buy">
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
