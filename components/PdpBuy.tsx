"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { ITR, formatPrice } from "@/lib/products";

const MORE =
  " Clip it inside a collar or jacket, draw out the thread and hook it to a can, a ring, a card or a bill. Lift your hands and it rises. When you are done, the thread winds back into the reel and nothing is left to find.";

function Row({ href, label, sub }: { href: string; label: string; sub?: string }) {
  return (
    <li>
      <Link href={href} className="dr-row">
        <span>
          {label}
          {sub && <small>{sub}</small>}
        </span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="M9 5l7 7-7 7" /></svg>
      </Link>
    </li>
  );
}

export default function PdpBuy() {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [more, setMore] = useState(false);
  const [pick, setPick] = useState(false);

  return (
    <div className="dr">
      <h1 className="dr-name">{ITR.name}</h1>
      <p className="dr-sub">Small reel, one thread, endless tricks</p>

      <div className="dr-opts">
        <button className="dr-link" onClick={() => setPick(!pick)} aria-expanded={pick}>
          {qty === 1 ? "Select quantity" : `Quantity: ${qty}`}
        </button>
        <a href="#tutorial" className="dr-link dr-muted">
          Watch tutorial
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="M9 5l7 7-7 7" /></svg>
        </a>
      </div>
      {pick && (
        <div className="dr-qty" role="radiogroup" aria-label="Quantity">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} role="radio" aria-checked={qty === n} className={qty === n ? "on" : ""} onClick={() => { setQty(n); setPick(false); }}>
              {n}
            </button>
          ))}
        </div>
      )}

      <button className="dr-add" onClick={() => add(qty)}>
        <span>Add to cart</span>
        <span>{formatPrice(ITR.price * qty)}</span>
      </button>

      <div className="dr-desc">
        <div className="dr-desc-head">
          <h2>Description</h2>
          <button className="dr-link dr-muted" onClick={() => setMore(!more)}>
            {more ? "See less" : "See more"}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden style={{ transform: more ? "rotate(-90deg)" : "none" }}><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <p className={more ? "open" : ""}>
          {ITR.blurb}
          {MORE}
        </p>
        {more && (
          <ul className="dr-details">
            {ITR.details.map((d) => <li key={d}>{d}</li>)}
            <li>Length 6.5 cm / 2.56 in</li>
          </ul>
        )}
      </div>

      <ul className="dr-rows">
        <Row href="#tutorial" label="How it works" sub="Watch the one-minute tutorial" />
        <Row href="/track" label="Track your order" />
        <Row href="/track" label="Delivery & Returns" />
        <Row href="/track" label="Contact us" />
      </ul>
    </div>
  );
}
