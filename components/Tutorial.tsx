"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AddToCart from "./AddToCart";
import { StepImage, STEP_COUNT } from "./StepCard";

const STEPS = Array.from({ length: STEP_COUNT }, (_, i) => i);

export default function Tutorial() {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0, dist = Infinity;
      el.querySelectorAll<HTMLElement>(".tut-card").forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (d < dist) { dist = d; best = i; }
      });
      setActive(best);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  return (
    <section id="how" className="tutorial">
      <div className="tut-head">
        <p className="tut-kicker">How it flies</p>
        <h2 className="tut-title">The ITR</h2>
        <p className="tut-text">
          Clip it on, pull out the thread, hook up whatever you dare and make it fly. Easy to learn, impossible to spot.
        </p>
        <div className="tut-ctas">
          <AddToCart label="Add to cart" />
          <Link href="/products/itr" className="tut-link">Details</Link>
        </div>
      </div>
      <div className="tut-stage">
        <div className="tut-rail" ref={rail}>
          {STEPS.map((i) => (
            <div key={i} className={`tut-card${i === active ? " is-active" : ""}`}>
              <StepImage i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
