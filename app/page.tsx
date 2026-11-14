import Image from "next/image";
import Link from "next/link";
import Collection from "@/components/Collection";
import Tutorial from "@/components/Tutorial";
import type { Metadata } from "next";
import Snow from "@/components/Snow";
import { CONTACT_EMAIL, ORDERS_EMAIL, SUPPORT_EMAIL } from "@/lib/contact";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const SITE = "https://itflew.com";
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "It Flew!",
    alternateName: ["It Flew", "ItFlew", "itflew", "It Flew Magic"],
    url: SITE,
    logo: `${SITE}/wordmark-black.png`,
    description:
      "It Flew! is a magic brand based in Stockholm, Sweden. We make the Levitation Pod, the trick behind the viral telekinesis prank, so anyone can make things fly without learning magic.",
    slogan: "Make anything fly.",
    email: CONTACT_EMAIL,
    address: { "@type": "PostalAddress", addressLocality: "Stockholm", addressCountry: "SE" },
    location: { "@type": "Place", name: "Stockholm, Sweden", address: { "@type": "PostalAddress", addressLocality: "Stockholm", addressCountry: "SE" } },
    areaServed: "Worldwide",
    knowsAbout: ["levitation magic", "telekinesis prank", "magic tricks for beginners"],
    sameAs: ["https://www.instagram.com/itflewmagic"],
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer support", email: SUPPORT_EMAIL, availableLanguage: ["English", "Swedish"], url: `${SITE}/contact` },
      { "@type": "ContactPoint", contactType: "orders and returns", email: ORDERS_EMAIL, availableLanguage: ["English", "Swedish"] },
      { "@type": "ContactPoint", contactType: "general enquiries", email: CONTACT_EMAIL, availableLanguage: ["English", "Swedish"] },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    name: "It Flew!",
    alternateName: ["It Flew", "ItFlew", "itflew.com"],
    url: SITE,
    publisher: { "@id": `${SITE}/#organization` },
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-frame">
          <div className="hero-art">
          <Image
            src="/hero-v4.webp"
            alt="It Flew! An engraved hand levitating a can with Levitation Pod"
            width={1042}
            height={1389}
            priority
            unoptimized
            className="hero-img"
          />
          </div>
          <div className="hero-copy">
            <h1 className="hero-mark">
              <Image
                src="/it-wordmark.webp"
                alt="It Flew! Levitation Pod"
                width={954}
                height={840}
                priority
                unoptimized
              />
            </h1>
            <Link href="/products/levitation-pod" className="hero-link">
              <span className="hero-link-text">Shop now</span>
            </Link>
          </div>
        </div>
        <Snow />
      </section>

      {/* PRODUCT — Rabanne-style contained card */}
      <Collection />

      {/* HOW — tutorial */}
      <Tutorial />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

    </main>
  );
}
