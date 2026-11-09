"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendSupport, type SupportState } from "@/app/actions/support";
import { SUPPORT_EMAIL } from "@/lib/contact";

const KEY = "itflew-chat-hidden";

const QUICK: { label: string; reply: React.ReactNode }[] = [
  { label: "Where's my order?", reply: <>Track it any time with your email and order number (it starts with IF). <Link href="/track">Track your order</Link></> },
  { label: "Shipping", reply: <>Standard shipping is free on every order. See <Link href="/shipping-returns">Shipping &amp; Returns</Link>.</> },
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

  const dismiss = () => {
    setHidden(true);
    try { sessionStorage.setItem(KEY, "1"); } catch {}
  };

  if (hidden && !open) return null;

  return (
    <>
      {!open && (
        <div className="sc-tab">
          <button className="sc-open" onClick={() => setOpen(true)} aria-label="Open support chat">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 12a8 7 0 1 1 3.2 5.6L4 19l1-3.4A6.8 6.8 0 0 1 4 12z" />
            </svg>
          </button>
          <button className="sc-close" onClick={dismiss} aria-label="Hide support button">
            <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      )}

      {open && (
        <div className="sc-wrap" onClick={() => setOpen(false)}>
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
