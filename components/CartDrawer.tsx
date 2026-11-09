"use client";

import { useEffect } from "react";
import { ITR, formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { qty, setQty, open, setOpen } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  if (!open) return null;

  return (
    <div className="drawer-wrap" onClick={() => setOpen(false)}>
      <aside className="drawer" role="dialog" aria-label="Cart" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h2>Your Bag</h2>
          <button className="icon-btn" aria-label="Close cart" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        {qty === 0 ? (
          <p className="muted">Nothing in here yet. Even the thread is invisible.</p>
        ) : (
          <>
            <div className="line">
              <div className="line-img">
                <Image src="/itr-hand.webp" alt="" width={412} height={947} unoptimized />
              </div>
              <div>
                <strong>{ITR.name}</strong>
                <div className="muted small">{ITR.short}</div>
                <div className="qty">
                  <button aria-label="Decrease" onClick={() => setQty(qty - 1)}>−</button>
                  <span>{qty}</span>
                  <button aria-label="Increase" onClick={() => setQty(qty + 1)}>+</button>
                </div>
              </div>
              <div>{formatPrice(ITR.price * qty)}</div>
            </div>
            <div className="total">
              <span>Subtotal</span>
              <span>{formatPrice(ITR.price * qty)}</span>
            </div>
            <Link href="/checkout" className="btn btn-red btn-block" onClick={() => setOpen(false)}>
              Checkout
            </Link>
          </>
        )}
      </aside>
    </div>
  );
}
