import Image from "next/image";
import Link from "next/link";
import Reel from "@/components/Reel";
import AddToCart from "@/components/AddToCart";
import WaitlistForm from "@/components/WaitlistForm";
import { ITR, formatPrice } from "@/lib/products";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-frame">
          <Image
            src="/hero.png"
            alt="An engraved hand levitating an It Flew! can"
            width={1049}
            height={1399}
            priority
            quality={100}
            sizes="(min-width: 700px) 675px, 100vw"
            className="hero-img"
          />
          <div className="hero-copy">
            <h1 className="display hero-title">
              New: The ITR
              <br />
              Thread Reel
            </h1>
            <Link href="/products/itr" className="hero-link">
              Discover
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              Rings rise ✦ Bills float ✦ Cards animate ✦ Pens hover ✦ Everything vanishes ✦ It flew! ✦&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* PRODUCT */}
      <section className="section dark">
        <h2 className="display section-title">The Reel</h2>
        <div className="product-card">
          <Link href="/products/itr" className="product-img">
            <Reel />
            <span className="tag">New</span>
          </Link>
          <div className="product-info">
            <p className="kicker kicker-red">{ITR.short}</p>
            <h3 className="display product-name">{ITR.name}</h3>
            <p className="price">{formatPrice(ITR.price)}</p>
            <p className="muted">{ITR.blurb}</p>
            <div className="row">
              <AddToCart />
              <Link href="/products/itr" className="btn btn-outline">Details</Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="section cream">
        <h2 className="display section-title ink">How It Flies</h2>
        <ol className="steps">
          <li>
            <span className="step-n display">01</span>
            <h3 className="display">Clip</h3>
            <p>Hide the reel in a pocket or under a sleeve. Nobody sees it. Nobody ever will.</p>
          </li>
          <li>
            <span className="step-n display">02</span>
            <h3 className="display">Pull</h3>
            <p>Draw out the invisible thread and hook up a ring, a bill, a card — whatever you dare.</p>
          </li>
          <li>
            <span className="step-n display">03</span>
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
