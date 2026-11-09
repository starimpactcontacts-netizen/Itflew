"use client";

import { useEffect } from "react";
import { useCart } from "./CartProvider";

export default function ClearCart() {
  const { setQty } = useCart();
  useEffect(() => setQty(0), [setQty]);
  return null;
}
