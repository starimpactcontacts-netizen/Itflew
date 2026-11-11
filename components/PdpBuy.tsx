"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { useDelivery } from "./useDelivery";
import { ITR, formatPrice } from "@/lib/products";

const MORE =
  " Clip it inside a collar or jacket, draw out the thread and hook it to a can, a ring, a card or a bill. Lift your hands and it rises. When you are done, the thread winds back into the pod and nothing is left to find.";

const Chev = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="M9 5l7 7-7 7" /></svg>
);

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
  const { add, setQty: setQtyCart } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [pick, setPick] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sticky, setSticky] = useState(false);
  const addRef = useRef<HTMLButtonElement>(null);
  const delivery = useDelivery();

  useEffect(() => {
    try { setSaved(localStorage.getItem("itflew-wish-itr") === "1"); } catch {}
  }, []);
  const toggleSave = () => {
    setSaved((v) => {
      try { localStorage.setItem("itflew-wish-itr", v ? "0" : "1"); } catch {}
      return !v;
    });
  };

  // show the bottom bar once the main Add to cart button has scrolled off the top
  useEffect(() => {
    const el = addRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSticky(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="dr">
      <h1 className="dr-name">{ITR.name}</h1>
      <p className="dr-sub">Small pod, one thread, endless tricks</p>

      <div className="dr-opts">
        <button className="dr-link" onClick={() => setPick(!pick)} aria-expanded={pick}>
          {qty === 1 ? "Select quantity" : `Quantity: ${qty}`}
        </button>
        <button className="dr-link dr-muted" onClick={() => window.dispatchEvent(new Event("itflew:show-tutorial"))}>
          Watch tutorial
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="M9 5l7 7-7 7" /></svg>
        </button>
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

      <div className="dr-pay" aria-label="Accepted payment methods">
        <span className="pm pm-apple"><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.8-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.3.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.8-1-2.8-4.3zM13.9 5.3c.7-.8 1.2-2 1.1-3.2-1 0-2.3.7-3 1.5-.7.8-1.3 2-1.1 3.1 1.1.1 2.3-.6 3-1.4z" /></svg>Pay</span>
        <span className="pm pm-visa">VISA</span>
        <span className="pm pm-mc" aria-label="Mastercard"><i /><i /></span>
        <span className="pm pm-box">AMEX</span>
        <span className="pm pm-box">DISCOVER</span>
      </div>

      <button ref={addRef} className="dr-add" onClick={() => add(qty)}>
        <span>Add to cart</span>
        <span>{formatPrice(ITR.price * qty)}</span>
      </button>
      <div className="dr-row2">
        <button className="dr-express" onClick={() => { setQtyCart(qty); router.push("/checkout"); }}>Express payment</button>
        <button className={`dr-heart${saved ? " on" : ""}`} onClick={toggleSave} aria-pressed={saved} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
        </button>
      </div>

      <div className={`dr-sticky${sticky ? " show" : ""}`} aria-hidden={!sticky}>
        <button className="dr-add" onClick={() => add(qty)} tabIndex={sticky ? 0 : -1}>
          <span>Add to cart</span>
          <span>{formatPrice(ITR.price * qty)}</span>
        </button>
      </div>

      <div className="dr-desc">
        <h2>Description</h2>
        <p className="open">
          {ITR.blurb}
          {MORE}
        </p>
        <ul className="dr-details">
          {ITR.details.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </div>

      <ul className="dr-rows">
        <li>
          <button className="dr-row" onClick={() => window.dispatchEvent(new Event("itflew:show-tutorial"))}>
            <span>How it works<small>Video tutorial and the four steps</small></span>
            <Chev />
          </button>
        </li>
        <Row href="/shipping-returns" label="Delivery & Returns" sub={delivery.by ? `Arrives${delivery.place ? ` in ${delivery.place}` : ""} by ${delivery.by} · $7 · 30-day returns` : "$7 shipping · 30-day returns"} />
        <li>
          <button className="dr-row" onClick={() => window.dispatchEvent(new Event("itflew:open-chat"))}>
            <span>Questions? Chat with us<small>Real answers from the It Flew! team</small></span>
            <Chev />
          </button>
        </li>
      </ul>
    </div>
  );
}
