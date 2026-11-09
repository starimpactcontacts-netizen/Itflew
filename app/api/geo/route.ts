import { NextRequest, NextResponse } from "next/server";

// Approximate visitor location from Vercel's edge headers (no lookup, no storage).
export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const h = req.headers;
  const dec = (v: string | null) => {
    if (!v) return null;
    try { return decodeURIComponent(v); } catch { return v; }
  };
  return NextResponse.json(
    { city: dec(h.get("x-vercel-ip-city")), region: dec(h.get("x-vercel-ip-country-region")), country: dec(h.get("x-vercel-ip-country")) },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
