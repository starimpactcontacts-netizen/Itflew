"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";

const KEY = "itflew-cookies";
type Choice = "all" | "necessary";

export default function CookieBanner() {
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);

  useEffect(() => {
    try { setChoice((localStorage.getItem(KEY) as Choice | null) ?? null); } catch { setChoice(null); }
  }, []);

  const pick = (c: Choice) => {
    setChoice(c);
    try { localStorage.setItem(KEY, c); } catch {}
  };

  return (
    <>
      {choice === "all" && <Analytics />}
      {choice === null && (
        <div className="ck" role="dialog" aria-label="Cookie preferences">
          <p className="ck-title">Cookies</p>
          <p className="ck-text">
            We use cookies to make the site work and, with your permission, to understand how it&apos;s used so we can improve it.{" "}
            <Link href="/privacy">Privacy policy</Link>
          </p>
          <div className="ck-btns">
            <button className="ck-ghost" onClick={() => pick("necessary")}>Necessary only</button>
            <button className="ck-main" onClick={() => pick("all")}>Accept all</button>
          </div>
        </div>
      )}
    </>
  );
}
