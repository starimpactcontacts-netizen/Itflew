import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/AddToCart";
import Poster from "@/components/Poster";
import WaitlistForm from "@/components/WaitlistForm";
import { ITR, formatPrice } from "@/lib/products";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-frame">
          <div className="hero-art">
          <Image
            src="/hero-v3.webp"
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
                src="/itk-wordmark.webp"
                alt="Invisible Thread Kit"
                width={954}
                height={972}
                priority
                unoptimized
              />
            </h1>
            <Link href="/products/itr" className="hero-link">
              <span className="hero-link-text">Discover</span>
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT — Rabanne-style contained card */}
      <section className="collection">
        <h2 className="display collection-title">Now Showing</h2>
        <div className="collection-card">
          <Link href="/products/itr" className="collection-img" aria-label={`${ITR.name}, view product`}>
            <Poster />
          </Link>
          <div className="collection-copy">
            <h3 className="display collection-name">{ITR.name}</h3>
            <p className="collection-meta">
              {ITR.short} <span aria-hidden>·</span> {formatPrice(ITR.price)}
            </p>
            <p className="collection-text">{ITR.blurb}</p>
            <div className="cta-row">
              <Link href="/products/itr" className="shop-link">
                Shop now
                <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <AddToCart variant="link" />
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="section cream">
        <h2 className="display section-title ink">How It Flies</h2>
        <ol className="steps">
          <li>
            <span className="step-n display">I</span>
            <h3 className="display">Clip</h3>
            <p>Hide the reel in a pocket or under a sleeve. Nobody sees it. Nobody ever will.</p>
          </li>
          <li>
            <span className="step-n display">II</span>
            <h3 className="display">Pull</h3>
            <p>Draw out the invisible thread and hook up a ring, a bill, a card — whatever you dare.</p>
          </li>
          <li>
            <span className="step-n display">III</span>
            <h3 className="display">Fly</h3>
            <p>Lift, float, animate. When you&apos;re done, the thread retracts and the evidence is gone.</p>
          </li>
        </ol>
      </section>

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
