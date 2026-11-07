"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type CartCtx = {
  qty: number;
  add: (n?: number) => void;
  setQty: (n: number) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "itflew-cart-itr";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [qty, setQtyState] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const v = Number(localStorage.getItem(KEY));
      if (v > 0) setQtyState(Math.min(99, Math.floor(v)));
    } catch {}
  }, []);

  const setQty = useCallback((n: number) => {
    const v = Math.max(0, Math.min(99, Math.floor(n)));
    setQtyState(v);
    try {
      localStorage.setItem(KEY, String(v));
    } catch {}
  }, []);

  const add = useCallback(
    (n = 1) => {
      setQtyState((q) => {
        const v = Math.min(99, q + n);
        try {
          localStorage.setItem(KEY, String(v));
        } catch {}
        return v;
      });
      setOpen(true);
    },
    []
  );

  return <Ctx.Provider value={{ qty, add, setQty, open, setOpen }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}
