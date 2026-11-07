"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "itflew-announce-closed";

export default function AnnouncementBar() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) setOpen(false);
    } catch {}
  }, []);

  if (!open) return null;

  return (
    <div className="announce">
      <Link href="/products/itr" className="announce-text">
        <span>Now &gt;</span>
        <span>Online exclusive preview | The ITR invisible thread reel</span>
      </Link>
      <button
        className="announce-close"
        aria-label="Close announcement"
        onClick={() => {
          setOpen(false);
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
        }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>
    </div>
  );
}
