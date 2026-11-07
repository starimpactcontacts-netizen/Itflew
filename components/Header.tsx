"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

export default function Header() {
  const { qty, setOpen } = useCart();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <header className="header">
      <Link href="/" className="brand" aria-label="It Flew! home" onClick={() => setMenu(false)}>
        <Image src="/wordmark-cream.png" alt="It Flew!" width={672} height={140} priority />
      </Link>
      <nav className="header-actions">
        <button className="icon-btn" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          {menu ? (
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6h18M3 12h18M7 18h14" />
            </svg>
          )}
        </button>
        <button className="icon-btn cart-btn" aria-label={`Cart, ${qty} items`} onClick={() => setOpen(true)}>
          <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden>
            {/* reel icon */}
            <circle cx="16" cy="18" r="11" fill="var(--red)" stroke="var(--cream)" strokeWidth="1.6" />
            <circle cx="16" cy="18" r="6.5" fill="none" stroke="var(--cream)" strokeWidth="1.2" />
            <circle cx="16" cy="18" r="2" fill="var(--cream)" />
            <path d="M16 7 C 18 4, 22 3, 26 2" fill="none" stroke="var(--cream)" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
          {qty > 0 && <span className="badge">{qty}</span>}
        </button>
      </nav>

      {menu && (
        <div className="menu">
          <Link href="/products/itr" onClick={() => setMenu(false)}>Shop the ITR</Link>
          <Link href="/#how" onClick={() => setMenu(false)}>How it works</Link>
          <Link href="/#list" onClick={() => setMenu(false)}>Join the list</Link>
        </div>
      )}
    </header>
  );
}
