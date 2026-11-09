"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ITR, formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";

// Dior-style bag: white bottom sheet on phones (about half the screen), side panel on desktop.
export default function CartDrawer() {
  const { qty, setQty, open, setOpen } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div className="bag-wrap" onClick={() => setOpen(false)}>
      <aside className="bag" role="dialog" aria-modal="true" aria-label="Your bag" onClick={(e) => e.stopPropagation()}>
        <span className="bag-grip" aria-hidden />
        <div className="bag-head">
          <h2>Your Bag</h2>
          <span className="bag-count">{qty} {qty === 1 ? "product" : "products"}</span>
          <button className="bag-x" aria-label="Close bag" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        </div>

        {qty === 0 ? (
          <div className="bag-empty">
            <p>Your bag is empty.</p>
            <Link href="/products/itr" className="co-primary" onClick={() => setOpen(false)}>
              <span>Shop Invisible Thread</span><span>›</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="bag-item">
              <div className="bag-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/product/reel-angle-v2.webp" alt="Invisible Thread reel" />
              </div>
              <div className="bag-info">
                <p className="bag-name">{ITR.name}</p>
                <p className="bag-sub">Small reel, one thread, endless tricks</p>
                <div className="bag-row">
                  <div className="bag-ctrl">
                    <div className="bag-qty" aria-label="Quantity">
                      <button aria-label="Decrease" onClick={() => setQty(qty - 1)}>−</button>
                      <span>{qty}</span>
                      <button aria-label="Increase" onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
                    </div>
                    <button className="co-u co-muted bag-remove" onClick={() => setQty(0)}>Remove</button>
                  </div>
                  <span>{formatPrice(ITR.price * qty)}</span>
                </div>
              </div>
            </div>
            <div className="bag-foot">
              <div className="bag-line"><span>Subtotal</span><span>{formatPrice(ITR.price * qty)}</span></div>
              <div className="bag-line bag-muted"><span>Delivery</span><span>{formatPrice(7)} · 7–12 business days</span></div>
              <Link href="/checkout" className="co-primary" onClick={() => setOpen(false)}>
                <span>Continue to checkout</span>
                <span>{formatPrice(ITR.price * qty + 7)}</span>
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
