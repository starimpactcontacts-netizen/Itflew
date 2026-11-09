"use client";

import { formatPrice } from "@/lib/products";
import { useDelivery } from "./useDelivery";

// Shown before any details are entered: when it arrives, where, and what it costs.
export default function DeliveryEstimate({ shipping = 7 }: { shipping?: number }) {
  const { place, range } = useDelivery();
  return (
    <div className="de">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </svg>
      <div>
        <p className="de-when">Arrives {range ?? "in 7–12 business days"}</p>
        <p className="de-where">
          Standard shipping{place ? <> to <strong>{place}</strong></> : null} · {formatPrice(shipping)}
        </p>
        <p className="de-note">Ships within 48 hours. Timing depends on your location, and major cities often arrive sooner.</p>
      </div>
    </div>
  );
}
