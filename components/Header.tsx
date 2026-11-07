"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

export default function Header() {
  const { qty, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlay = usePathname() === "/";

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const solid = !overlay || scrolled || menu;

  return (
    <header className={`header ${solid ? "is-solid" : "is-overlay"}`}>
      <div className="header-left">
        <button className="icon-btn" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          {menu ? (
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9h18M3 15h18" />
            </svg>
          )}
        </button>
        <Link href="/" className="brand" aria-label="It Flew! home" onClick={() => setMenu(false)}>
          <Image src="/wordmark-white.png" alt="It Flew!" width={672} height={140} priority />
        </Link>
      </div>
      <button className="icon-btn cart-btn" aria-label={`Bag, ${qty} items`} onClick={() => setOpen(true)}>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M5 8h14l-1.2 12H6.2z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        {qty > 0 && <span className="badge">{qty}</span>}
      </button>

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
