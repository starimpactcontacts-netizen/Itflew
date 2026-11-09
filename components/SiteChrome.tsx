"use client";

import { usePathname } from "next/navigation";

// Hides its children (the big footer) on the distraction-free checkout.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path.startsWith("/checkout")) {
    return (
      <footer className="co-foot">
        <nav className="co-foot-links"><a href="/privacy">Privacy policy</a><a href="/terms">Terms of sale</a><a href="/shipping-returns">Shipping &amp; returns</a></nav>
        <span>© {new Date().getFullYear()} It Flew!</span>
      </footer>
    );
  }
  return <>{children}</>;
}
