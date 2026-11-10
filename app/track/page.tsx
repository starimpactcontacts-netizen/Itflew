import type { Metadata } from "next";
import { TrackContent } from "@/components/TrackPanel";

export const metadata: Metadata = { title: "Track Your Order", description: "Track your It Flew! order with your email and order number.", alternates: { canonical: "/track" } };

export default function TrackPage() {
  return (
    <main className="tk-page">
      <div className="tk-card">
        <TrackContent />
      </div>
    </main>
  );
}
