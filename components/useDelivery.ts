"use client";

import { useEffect, useState } from "react";
import { deliveryWindow, fmtDay } from "@/lib/delivery";

type Geo = { city: string | null; region: string | null; country: string | null };
let pending: Promise<Geo | null> | null = null;

function loadGeo(): Promise<Geo | null> {
  try {
    const c = sessionStorage.getItem("itflew-geo");
    if (c) return Promise.resolve(JSON.parse(c));
  } catch {}
  pending ??= fetch("/api/geo")
    .then((r) => (r.ok ? r.json() : null))
    .then((g: Geo | null) => {
      try { if (g) sessionStorage.setItem("itflew-geo", JSON.stringify(g)); } catch {}
      return g;
    })
    .catch(() => null);
  return pending;
}

function placeName(g: Geo | null) {
  if (!g) return null;
  if (g.city) return g.city;
  if (g.country) {
    try { return new Intl.DisplayNames(["en"], { type: "region" }).of(g.country) ?? null; } catch { return null; }
  }
  return null;
}

// Personal delivery estimate: dated window plus the visitor's city when known.
export function useDelivery() {
  const [place, setPlace] = useState<string | null>(null);
  const [range, setRange] = useState<string | null>(null);
  const [by, setBy] = useState<string | null>(null);

  useEffect(() => {
    const { from, to } = deliveryWindow();
    setRange(`${fmtDay(from)} – ${fmtDay(to)}`);
    setBy(fmtDay(to));
    let live = true;
    loadGeo().then((g) => live && setPlace(placeName(g)));
    return () => { live = false; };
  }, []);

  return { place, range, by };
}
