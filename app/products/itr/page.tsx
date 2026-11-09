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
          <PdpBuy />
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
