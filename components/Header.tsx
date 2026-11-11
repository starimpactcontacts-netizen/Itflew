"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import TrackPanel from "./TrackPanel";

export default function Header() {
  const { qty, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const [track, setTrack] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const overlay = path === "/";

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 40);
      const f = document.querySelector(".fs");
      setOverFooter(!!f && f.getBoundingClientRect().top < window.innerHeight);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const solid = !overlay || scrolled || menu;
  const dark = overFooter && !menu;

  if (path.startsWith("/checkout")) {
    return (
      <header className="header is-solid co-header">
        <button className="co-back" onClick={() => (window.history.length > 1 ? router.back() : router.push("/products/levitation-pod"))}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M15 4l-8 8 8 8" /></svg>
          Back
        </button>
        <Link href="/" className="co-logo" aria-label="It Flew! home">
          <Image src="/wordmark-black.png" alt="It Flew!" width={672} height={140} priority />
        </Link>
        <span aria-hidden />
      </header>
    );
  }

  return (
    <header className={`header ${dark ? "is-dark" : solid ? "is-solid" : "is-overlay"}`}>
      <div className="header-left">
        <Link href="/" className="brand" aria-label="It Flew! home" onClick={() => setMenu(false)}>
          <Image src={solid && !dark ? "/wordmark-black.png" : "/wordmark-white.png"} alt="It Flew!" width={672} height={140} priority />
        </Link>
      </div>
      <div className="header-right">
      <button className="icon-btn" aria-label="Track your order" onClick={() => { setMenu(false); setTrack(true); }}>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
        </svg>
      </button>
      <button className="icon-btn cart-btn" aria-label={`Bag, ${qty} items`} onClick={() => setOpen(true)}>
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M5 8h14l-1.2 12H6.2z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
        {qty > 0 && <span className="badge">{qty}</span>}
      </button>
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
      </div>

      {track && <TrackPanel onClose={() => setTrack(false)} />}
      {menu && (
        <div className="menu">
          <Link href="/products/levitation-pod" onClick={() => setMenu(false)}>Shop Levitation Pod</Link>
          <Link href="/#how" onClick={() => setMenu(false)}>How it works</Link>
          <Link href="/about" onClick={() => setMenu(false)}>About It Flew!</Link>
          <Link href="/#list" onClick={() => setMenu(false)}>Join the list</Link>
          <Link href="/track" onClick={() => setMenu(false)}>Track order</Link>
        </div>
      )}
    </header>
  );
}
