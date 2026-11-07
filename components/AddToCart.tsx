"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCart({ withQty = false, label = "Add to bag" }: { withQty?: boolean; label?: string }) {
  const { add } = useCart();
  const [n, setN] = useState(1);

  return (
    <div className="atc">
      {withQty && (
        <div className="qty qty-lg">
          <button aria-label="Decrease" onClick={() => setN(Math.max(1, n - 1))}>−</button>
          <span>{n}</span>
          <button aria-label="Increase" onClick={() => setN(Math.min(99, n + 1))}>+</button>
        </div>
      )}
      <button className="btn btn-red" onClick={() => add(withQty ? n : 1)}>
        {label}
      </button>
    </div>
  );
}
