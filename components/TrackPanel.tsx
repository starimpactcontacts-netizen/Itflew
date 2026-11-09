"use client";

import { useEffect } from "react";
import TrackForm from "./TrackForm";

export function TrackContent() {
  return (
    <>
      <div className="tk-head">
        <h2>Track your order</h2>
        <p>Be informed about the latest updates on your order</p>
      </div>
      <TrackForm />
    </>
  );
}

// Dior-style panel opened from the person icon
export default function TrackPanel({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="tk-overlay" onClick={onClose}>
      <div className="tk-panel" role="dialog" aria-modal="true" aria-label="Track your order" onClick={(e) => e.stopPropagation()}>
        <button className="tk-x" aria-label="Close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>
        <TrackContent />
      </div>
    </div>
  );
}
