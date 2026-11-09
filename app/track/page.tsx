import type { Metadata } from "next";
import { TrackContent } from "@/components/TrackPanel";

export const metadata: Metadata = { title: "Track Your Order | It Flew!" };

export default function TrackPage() {
  return (
    <main className="tk-page">
      <div className="tk-card">
        <TrackContent />
      </div>
    </main>
  );
}
