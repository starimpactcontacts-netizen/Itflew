import type { Metadata } from "next";
import Link from "next/link";
import PdpGallery from "@/components/PdpGallery";
import PdpBuy from "@/components/PdpBuy";
import TutorialVideo from "@/components/TutorialVideo";
import { ITR } from "@/lib/products";

export const metadata: Metadata = {
  title: "Invisible Thread | It Flew!",
  description: ITR.blurb,
};

const STEPS = [
  ["Clip", "Clip the reel inside your collar or jacket."],
  ["Draw", "Pinch the tip and draw out a length of thread."],
  ["Hook", "Secretly hook the thread to the can, ring or card."],
  ["Lift", "Raise your hands slowly. It flies."],
];

export default function ProductPage() {
  return (
    <main className="pd">
      <div className="pd-top">
        <PdpGallery />
        <div className="pd-info">
          <h1 className="pd-title">{ITR.name}, small reel, one thread, endless tricks</h1>
          <PdpBuy />
          <ul className="pd-links">
            <li>
              <Link href="/track">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></svg>
                Track your order
              </Link>
            </li>
            <li>
              <a href="#tutorial">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></svg>
                Watch the tutorial
              </a>
            </li>
          </ul>
        </div>
      </div>

      <section id="tutorial" className="pd-tut">
        <p className="pd-label">Tutorial</p>
        <h2 className="pd-h2">Learn it in a minute</h2>
        <TutorialVideo />
        <ol className="pd-steps">
          {STEPS.map(([t, d], i) => (
            <li key={t}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <strong>{t}</strong>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pd-acc">
        <details open>
          <summary>Details<i aria-hidden /></summary>
          <ul>{ITR.details.map((d) => <li key={d}>{d}</li>)}</ul>
        </details>
        <details>
          <summary>In the box<i aria-hidden /></summary>
          <ul><li>1 × Invisible Thread reel</li></ul>
        </details>
        <details>
          <summary>Need help?<i aria-hidden /></summary>
          <ul><li><Link href="/track">Track your order</Link></li></ul>
        </details>
      </section>
    </main>
  );
}
