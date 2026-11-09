"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type InspectImage = { src: string; alt: string };

// Fullscreen image inspector: tap/click to zoom, drag to pan, pinch or scroll-wheel to zoom.
export default function Inspector({
  images,
  start,
  onClose,
}: {
  images: InspectImage[];
  start: number;
  onClose: () => void;
}) {
  const [i, setI] = useState(start);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; px: number; py: number; moved: boolean } | null>(null);
  const pinch = useRef<{ d: number; s: number } | null>(null);

  const reset = () => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  };
  const go = useCallback(
    (d: number) => {
      setI((v) => (v + d + images.length) % images.length);
      reset();
    },
    [images.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  const clamp = (s: number) => Math.min(5, Math.max(1, s));

  const zoomAt = (clientX: number, clientY: number, next: number) => {
    const r = stage.current!.getBoundingClientRect();
    const ox = clientX - r.left - r.width / 2;
    const oy = clientY - r.top - r.height / 2;
    const k = next / scale;
    setPos((p) => (next === 1 ? { x: 0, y: 0 } : { x: ox - (ox - p.x) * k, y: oy - (oy - p.y) * k }));
    setScale(next);
  };

  return (
    <div className="insp" role="dialog" aria-modal="true" aria-label="Image inspector">
      <div className="insp-top">
        <span>
          {i + 1} / {images.length}
        </span>
        <span className="insp-hint">{scale > 1 ? "Drag to look around" : "Tap to zoom"}</span>
        <button className="insp-x" aria-label="Close inspector" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>
      </div>

      <div
        ref={stage}
        className={`insp-stage${scale > 1 ? " zoomed" : ""}`}
        onWheel={(e) => zoomAt(e.clientX, e.clientY, clamp(scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15)))}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || pinch.current) return;
          const dx = e.clientX - d.x, dy = e.clientY - d.y;
          if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
          if (scale > 1) setPos({ x: d.px + dx, y: d.py + dy });
        }}
        onPointerUp={(e) => {
          const d = drag.current;
          drag.current = null;
          if (!d) return;
          if (!d.moved) zoomAt(e.clientX, e.clientY, scale > 1 ? 1 : 2.5);
          else if (scale === 1 && Math.abs(e.clientX - d.x) > 50) go(e.clientX < d.x ? 1 : -1);
        }}
        onTouchStart={(e) => {
          if (e.touches.length === 2) {
            const [a, b] = [e.touches[0], e.touches[1]];
            pinch.current = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), s: scale };
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 2 && pinch.current) {
            const [a, b] = [e.touches[0], e.touches[1]];
            const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
            zoomAt((a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2, clamp((pinch.current.s * d) / pinch.current.d));
          }
        }}
        onTouchEnd={(e) => {
          if (e.touches.length < 2) pinch.current = null;
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[i].src}
          alt={images[i].alt}
          draggable={false}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
        />
      </div>

      <div className="insp-bar">
        <button aria-label="Previous image" onClick={() => go(-1)}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M15 4l-8 8 8 8" /></svg>
        </button>
        <div className="insp-thumbs">
          {images.map((im, k) => (
            <button key={im.src} className={k === i ? "on" : ""} aria-label={`Show image ${k + 1}`} onClick={() => { setI(k); reset(); }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt="" />
            </button>
          ))}
        </div>
        <button aria-label="Next image" onClick={() => go(1)}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 4l8 8-8 8" /></svg>
        </button>
      </div>
    </div>
  );
}
