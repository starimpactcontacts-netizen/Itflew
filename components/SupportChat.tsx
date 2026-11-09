"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendSupport, type SupportState } from "@/app/actions/support";
import { SUPPORT_EMAIL } from "@/lib/contact";

const KEY = "itflew-chat-hidden";

const QUICK: { label: string; reply: React.ReactNode }[] = [
  { label: "Where's my order?", reply: <>Track it any time with your email and order number (it starts with IF). <Link href="/track">Track your order</Link></> },
  { label: "Shipping", reply: <>Standard shipping is free and takes 7–12 business days. We fulfil orders within 24–48 hours, and most big-city orders arrive within 5–7 days once dispatched. <Link href="/shipping-returns">Shipping &amp; Returns</Link></> },
  { label: "How does it work?", reply: <>Clip the reel inside your collar or jacket, draw the thread, hook it, lift. <Link href="/products/itr#tutorial">Watch the tutorial</Link></> },
  { label: "Returns", reply: <>Unused reels can be returned within 30 days. Details in <Link href="/shipping-returns">Shipping &amp; Returns</Link>.</> },
];

export default function SupportChat() {
  const path = usePathname();
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);
  const [asked, setAsked] = useState<number[]>([]);
  const [state, action, pending] = useActionState<SupportState, FormData>(sendSupport, null);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { setHidden(sessionStorage.getItem(KEY) === "1"); } catch { setHidden(false); }
  }, []);
  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: "smooth" });
  }, [asked, state, open]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  // draggable edge tab: snaps to the nearest side, remembers where it was left
  const W = 26, H = 84;
  const [pos, setPos] = useState<{ side: "left" | "right"; y: number }>({ side: "left", y: 0.6 });
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const start = useRef<{ px: number; py: number; x: number; y: number; moved: boolean; hit: "x" | "open" } | null>(null);
  const moved = useRef(false);
  const openedAt = useRef(0);

  useEffect(() => {
    const on = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    on();
    window.addEventListener("resize", on);
    try {
      const saved = JSON.parse(localStorage.getItem("itflew-chat-pos") ?? "null");
      if (saved && (saved.side === "left" || saved.side === "right") && typeof saved.y === "number") setPos(saved);
    } catch {}
    return () => window.removeEventListener("resize", on);
  }, []);

  const clampY = (y: number) => Math.min(Math.max(y, 72), Math.max(72, vh - H - 24));
  const restX = pos.side === "left" ? 0 : vw - W;
  const restY = clampY(pos.y * vh);
  const tabX = drag ? drag.x : restX;
  const tabY = drag ? drag.y : restY;

  const onDown = (e: React.PointerEvent) => {
    start.current = { px: e.clientX, py: e.clientY, x: restX, y: restY, moved: false, hit: (e.target as Element).closest(".sc-x") ? "x" : "open" };
    moved.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const st = start.current;
    if (!st) return;
    const dx = e.clientX - st.px, dy = e.clientY - st.py;
    if (!st.moved && Math.hypot(dx, dy) < 6) return;
    st.moved = true;
    moved.current = true;
    setDrag({ x: Math.min(Math.max(st.x + dx, 0), vw - W), y: clampY(st.y + dy) });
  };
  const onUp = () => {
    const st = start.current;
    start.current = null;
    if (!st) return;
    if (!st.moved || !drag) {
      setDrag(null);
      if (st.hit === "x") dismiss();
      else {
        openedAt.current = Date.now();
        setOpen(true);
      }
      return;
    }
    const next = { side: (drag.x + W / 2 < vw / 2 ? "left" : "right") as "left" | "right", y: drag.y / vh };
    setPos(next);
    setDrag(null);
    try { localStorage.setItem("itflew-chat-pos", JSON.stringify(next)); } catch {}
  };
  // pointer taps are handled in onUp; onClick only serves keyboard activation (detail === 0)
  const guard = (fn: () => void) => (e: React.MouseEvent) => { if (e.detail === 0) fn(); };

  const dismiss = () => {
    setHidden(true);
    try { sessionStorage.setItem(KEY, "1"); } catch {}
  };

  if (hidden && !open) return null;

  return (
    <>
      {!open && (
        <div
          className={`sc-tab sc-${drag ? (drag.x + W / 2 < vw / 2 ? "left" : "right") : pos.side}${drag ? " dragging" : ""}`}
          style={{ transform: `translate3d(${tabX}px, ${tabY}px, 0)`, visibility: vw ? "visible" : "hidden" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <button className="sc-x" onClick={guard(dismiss)} aria-label="Hide chat button">
            <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <button className="sc-open" onClick={guard(() => setOpen(true))} aria-label="Open support chat">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M4 12a8 7 0 1 1 3.2 5.6L4 19l1-3.4A6.8 6.8 0 0 1 4 12z" />
            </svg>
          </button>
        </div>
      )}

      {open && (
        <div className="sc-wrap" onClick={() => { if (Date.now() - openedAt.current > 450) setOpen(false); }}>
          <section className="sc-panel" role="dialog" aria-label="Support" onClick={(e) => e.stopPropagation()}>
            <header className="sc-head">
              <div>
                <strong>IT FLEW! Support</strong>
                <span>We reply by email, usually within a day</span>
              </div>
              <button aria-label="Close support" onClick={() => setOpen(false)}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 5l14 14M19 5L5 19" /></svg>
              </button>
            </header>
            <div className="sc-body" ref={body}>
              <p className="sc-msg them">Hello. How can we help?</p>
              {asked.map((i, n) => (
                <div key={n}>
                  <p className="sc-msg me">{QUICK[i].label}</p>
                  <p className="sc-msg them">{QUICK[i].reply}</p>
                </div>
              ))}
              <div className="sc-quick">
                {QUICK.map((q, i) => (
                  <button key={q.label} onClick={() => setAsked((a) => [...a, i])}>{q.label}</button>
                ))}
              </div>
              {state?.ok && <p className="sc-msg them">{state.message}</p>}
            </div>
            <button className="sc-hide" onClick={() => { dismiss(); setOpen(false); }}>Hide chat button</button>
            {state?.ok ? (
              <p className="sc-foot-note">Or email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>
            ) : (
              <form action={action} className="sc-form">
                <input type="hidden" name="page" value={path} />
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="sc-hp" aria-hidden />
                <input name="email" type="email" required placeholder="Your email" autoComplete="email" />
                <div className="sc-row">
                  <textarea name="message" required placeholder="Write a message…" rows={2} maxLength={4000} />
                  <button aria-label="Send" disabled={pending}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden><path d="M3 20l18-8L3 4l2 7 9 1-9 1z" /></svg>
                  </button>
                </div>
                {state && !state.ok && <p className="sc-err">{state.message}</p>}
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
