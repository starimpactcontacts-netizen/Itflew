"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Poster from "./Poster";
import AddToCart from "./AddToCart";
import { ITR, formatPrice } from "@/lib/products";

type Slide = { key: string; tag?: string; name: React.ReactNode; desc: string; price?: number; href: string; media: React.ReactNode };

const SLIDES: Slide[] = [
  {
    key: "thread",
    tag: "New",
    name: <>Invisible<br />Thread</>,
    desc: "Make anything fly.",
    price: ITR.price,
    href: "/products/itr",
    media: <Poster />,
  },
  {
    key: "jacket",
    name: <>No One<br />Sees It</>,
    desc: "Hides inside your jacket.",
    href: "/products/itr",
    media: (
      <Image
        className="cover jacket"
        src="/itr-jacket.webp"
        alt="Invisible Thread clipped inside a jacket, its invisible thread running down the lining"
        width={1072}
        height={1008}
        unoptimized
      />
    ),
  },
];

export default function Collection() {
  const rail = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [scrollable, setScrollable] = useState(true);
  const [thumb, setThumb] = useState({ left: 0, width: 100 });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => {
      const slide = el.querySelector<HTMLElement>(".slide");
      if (!slide) return;
      const step = slide.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      setScrollable(el.scrollWidth > el.clientWidth + 2);
      const max = el.scrollWidth - el.clientWidth;
      const width = (el.clientWidth / el.scrollWidth) * 100;
      setThumb({ width, left: max > 0 ? (el.scrollLeft / max) * (100 - width) : 0 });
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      setIndex(atEnd ? SLIDES.length - 1 : Math.round(el.scrollLeft / step));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = rail.current;
    const slide = el?.querySelector<HTMLElement>(".slide");
    if (!el || !slide) return;
    const step = slide.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="collection">
      <div className="collection-head">
        <h2 className="display collection-title">Now Showing</h2>
        <div className="collection-bar">
          <AddToCart variant="link" label="Add to cart" className="shop-all" />
          <div className="pager" aria-label="Carousel controls" hidden={!scrollable}>
            <button aria-label="Previous" disabled={index === 0} onClick={() => go(-1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M15 4l-8 8 8 8" /></svg>
            </button>
            <span>
              {index + 1}/{SLIDES.length}
            </span>
            <button aria-label="Next" disabled={index === SLIDES.length - 1} onClick={() => go(1)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 4l8 8-8 8" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div className="collection-body">
        <div className="rail" ref={rail}>
          {SLIDES.map((s) => (
            <Link key={s.key} href={s.href} className="slide">
              <div className="slide-media">
                {s.media}
                {s.tag && <span className="slide-tag">{s.tag}</span>}
              </div>
              <div className="slide-copy">
                <h3 className="slide-name">{s.name}</h3>
                <p className="slide-desc">{s.desc}</p>
                {s.price != null && <p className="slide-price">{formatPrice(s.price)}</p>}
              </div>
            </Link>
          ))}
        </div>
        <div className="rail-progress" aria-hidden hidden={!scrollable}>
          <span className="rail-thumb" style={{ left: `${thumb.left}%`, width: `${thumb.width}%` }} />
        </div>
      </div>
    </section>
  );
}
