"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Poster from "./Poster";

type Slide = { name: React.ReactNode; sub: string; href: string; media: React.ReactNode };

const SLIDES: Slide[] = [
  { name: <>Invisible<br />Thread</>, sub: "Make anything fly · $35", href: "/products/itr", media: <Poster /> },
  {
    name: <>No One<br />Sees It</>,
    sub: "Hides inside your jacket",
    href: "/products/itr",
    media: (
      <Image
        className="cover jacket"
        src="/itr-jacket.webp"
        alt="The ITR clipped inside a jacket, its invisible thread running down the lining"
        width={1072}
        height={1008}
        unoptimized
      />
    ),
  },
];

export default function Collection() {
  const rail = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ left: 0, width: 100 });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const width = (el.clientWidth / el.scrollWidth) * 100;
      const left = max > 0 ? (el.scrollLeft / max) * (100 - width) : 0;
      setThumb({ left, width });
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

  return (
    <section className="collection">
      <div className="collection-head">
        <h2 className="display collection-title">Now Showing</h2>
        <p className="collection-lede">The tools magicians are reaching for right now.</p>
      </div>
      <div className="collection-body">
      <div className="rail" ref={rail}>
        {SLIDES.map((s) => (
          <Link key={s.sub} href={s.href} className="slide">
            <div className="slide-media">{s.media}</div>
            <h3 className="display slide-name">{s.name}</h3>
            <p className="slide-sub">{s.sub}</p>
            <span className="slide-cta">
              Shop now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
      <div className="rail-progress" aria-hidden>
        <span className="rail-thumb" style={{ left: `${thumb.left}%`, width: `${thumb.width}%` }} />
      </div>
      </div>
    </section>
  );
}
