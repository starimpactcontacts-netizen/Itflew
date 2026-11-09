"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SHOT = (src: string, alt: string) => (
  <Image src={src} alt={alt} width={948} height={1264} unoptimized className="pg-img" />
);

const SHOTS = [
  { key: "angle", node: SHOT("/product/reel-angle.webp", "Invisible Thread reel at an angle, clip underneath") },
  { key: "front", node: SHOT("/product/reel-front.webp", "Invisible Thread reel, front view with clip") },
  { key: "jacket", node: <Image src="/product/reel-jacket.webp" alt="Invisible Thread clipped inside a jacket, thread running down the lining" width={756} height={1008} unoptimized className="pg-img" /> },
];

export default function PdpGallery() {
  const rail = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

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
        {SHOTS.map((s) => (
          <div key={s.key} className="pg-slide">{s.node}</div>
        ))}
      </div>
      <button className="pg-next" aria-label="Next image" onClick={() => go(1)}>
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M9 4l8 8-8 8" /></svg>
      </button>
      <div className="pg-bar" aria-hidden>
        <span style={{ width: `${100 / SHOTS.length}%`, left: `${(i * 100) / SHOTS.length}%` }} />
      </div>
    </div>
  );
}
