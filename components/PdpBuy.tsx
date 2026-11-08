"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { ITR, formatPrice } from "@/lib/products";

export default function PdpBuy() {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [more, setMore] = useState(false);

  return (
    <>
      <p className={`pd-desc${more ? " open" : ""}`}>
        {ITR.blurb} Clip it inside a collar or jacket, draw out the thread and hook it to a can, a ring, a card or a bill.
        Lift your hands and it rises. When you are done, the thread winds back into the reel and nothing is left to find.
      </p>
      <button className="pd-more" onClick={() => setMore(!more)}>{more ? "Read less" : "Read more"}</button>

      <ul className="pd-perks">
        <li>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M5 8h14l-1.2 12H6.2z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          Pocket sized, clips anywhere
        </li>
        <li>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>
          Beginner friendly, learn it in minutes
        </li>
      </ul>

      <p className="pd-label">Quantity</p>
      <label className="pd-select">
        <span className="sr-only">Quantity</span>
        <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n === 1 ? "1 reel" : `${n} reels`}</option>
          ))}
        </select>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><path d="M5 9l7 7 7-7" /></svg>
      </label>

      <p className="pd-price">{formatPrice(ITR.price * qty)} <span>USD</span></p>
      <button className="pd-add" onClick={() => add(qty)}>Add to cart</button>
    </>
  );
}
