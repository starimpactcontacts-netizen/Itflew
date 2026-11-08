"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

type Props = { withQty?: boolean; label?: string; variant?: "solid" | "link"; className?: string };

export default function AddToCart({ withQty = false, label = "Add to bag", variant = "solid", className }: Props) {
  const { add } = useCart();
  const [n, setN] = useState(1);

  if (variant === "link") {
    return (
      <button className={className ?? "link-cta"} onClick={() => add(1)}>
        {label}
      </button>
    );
  }

  return (
    <div className="atc">
      {withQty && (
        <div className="qty qty-lg">
          <button aria-label="Decrease" onClick={() => setN(Math.max(1, n - 1))}>−</button>
          <span>{n}</span>
          <button aria-label="Increase" onClick={() => setN(Math.min(99, n + 1))}>+</button>
        </div>
      )}
      <button className="btn btn-red atc-btn" onClick={() => add(withQty ? n : 1)}>
        {label}
      </button>
    </div>
  );
}
