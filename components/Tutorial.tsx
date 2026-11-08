"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import AddToCart from "./AddToCart";
import { StepImage, STEP_COUNT } from "./StepCard";

const CAPTIONS = [
  "Clip the reel inside your collar or jacket, the thread runs out unseen.",
  "Pinch the tip and draw a length of invisible thread off the spool.",
  "Secretly hook the thread to the can, then step back with open hands.",
  "Lift your hands slowly and the can rises straight to you. It flew.",
];

// Looping 3-up carousel: one card in front, one peeking left, one right — always.
export default function Tutorial() {
  const [active, setActive] = useState(0);
  const start = useRef<number | null>(null);
  const go = (d: number) => setActive((a) => (a + d + STEP_COUNT) % STEP_COUNT);

  const pos = (i: number) => {
    let o = (i - active + STEP_COUNT) % STEP_COUNT;
    if (o > STEP_COUNT / 2) o -= STEP_COUNT;
    return o; // -1 left, 0 front, 1 right, else hidden
  };

  return (
    <section id="how" className="tutorial">
      <div className="tut-head">
        <p className="tut-kicker">How it flies</p>
        <h2 className="tut-title">Invisible Thread</h2>
        <p className="tut-text">
          Clip it on, pull out the thread, hook up whatever you dare and make it fly. Easy to learn, impossible to spot.
        </p>
        <div className="tut-ctas">
          <AddToCart label="Add to cart" />
          <Link href="/products/itr" className="tut-link">Details</Link>
        </div>
      </div>
      <div
        className="tut-stage"
        onTouchStart={(e) => (start.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (start.current == null) return;
          const dx = e.changedTouches[0].clientX - start.current;
          if (Math.abs(dx) > 35) go(dx < 0 ? 1 : -1);
          start.current = null;
        }}
      >
        <div className="tut-deck" aria-roledescription="carousel">
          {Array.from({ length: STEP_COUNT }, (_, i) => {
            const o = pos(i);
            const cls = o === 0 ? "front" : o === -1 ? "left" : o === 1 ? "right" : "hidden";
            return (
              <button
                key={i}
                className={`tut-card ${cls}`}
                onClick={() => o !== 0 && go(o)}
                aria-label={o === 0 ? `Step card ${i + 1} of ${STEP_COUNT}` : o < 0 ? "Previous step" : "Next step"}
                aria-hidden={cls === "hidden"}
                tabIndex={cls === "hidden" ? -1 : 0}
              >
                <StepImage i={i} />
              </button>
            );
          })}
        </div>
        <p className="tut-caption" aria-live="polite">
          <span>{active === 0 ? "The setup" : `Step ${active + 1}`}</span>
          {CAPTIONS[active]}
        </p>
        <div className="tut-dots">
          {Array.from({ length: STEP_COUNT }, (_, i) => (
            <button key={i} aria-label={`Show step ${i + 1}`} className={i === active ? "on" : ""} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
