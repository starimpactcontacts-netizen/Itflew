"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Inspector from "./Inspector";

// Product photos: 3:4, subject centred, 2x super-resolved (see public/product).
const SHOTS = [
  { src: "/product/reel-angle-hd.webp", alt: "Invisible Thread reel at an angle, clip underneath", w: 1454, h: 1938 },
  { src: "/product/reel-front-hd.webp", alt: "Invisible Thread reel, front view with clip", w: 2048, h: 2730 },
  { src: "/product/reel-jacket-hd.webp", alt: "Invisible Thread clipped inside a jacket, thread running down the lining", w: 1512, h: 2016 },
];

export default function PdpGallery() {
  const rail = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const on = () => setI(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);

  const go = (d: number) => {
    const el = rail.current;
    if (!el) return;
    const n = (i + d + SHOTS.length) % SHOTS.length;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="pg">
      <div className="pg-rail" ref={rail}>
        {SHOTS.map((s, k) => (
          <button key={s.src} className="pg-slide" onClick={() => setOpen(true)} aria-label={`Inspect image ${k + 1}`}>
            <Image src={s.src} alt={s.alt} width={s.w} height={s.h} unoptimized priority={k === 0} className="pg-img" />
          </button>
        ))}
      </div>
      <button className="pg-zoom" aria-label="Inspect and zoom" onClick={() => setOpen(true)}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5L21 21M10.5 7.5v6M7.5 10.5h6" />
        </svg>
      </button>
      <button className="pg-next" aria-label="Next image" onClick={() => go(1)}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M9 4l8 8-8 8" /></svg>
      </button>
      <div className="pg-bar" aria-hidden>
        <span style={{ width: `${100 / SHOTS.length}%`, left: `${(i * 100) / SHOTS.length}%` }} />
      </div>
      {open && <Inspector images={SHOTS} start={i} onClose={() => setOpen(false)} />}
    </div>
  );
}
