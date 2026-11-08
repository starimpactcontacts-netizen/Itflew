import Image from "next/image";
import Link from "next/link";
import Collection from "@/components/Collection";
import Tutorial from "@/components/Tutorial";
import Snow from "@/components/Snow";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-frame">
          <div className="hero-art">
          <Image
            src="/hero-v4.webp"
            alt="An engraved hand levitating an It Flew! can"
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
                alt="Invisible Thread"
                width={954}
                height={972}
                priority
                unoptimized
              />
            </h1>
            <Link href="/products/itr" className="hero-link">
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

      {/* LIST */}
      <section id="list" className="section red grain center">
        <p className="kicker">Drops, restocks &amp; secrets</p>
        <h2 className="display section-title">Get On The List</h2>
        <p className="list-sub">Be first to know when new reels land.</p>
        <WaitlistForm />
      </section>
    </main>
  );
}
