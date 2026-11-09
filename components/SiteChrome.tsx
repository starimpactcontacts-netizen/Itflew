"use client";

import { usePathname } from "next/navigation";

// Hides its children (the big footer) on the distraction-free checkout.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path.startsWith("/checkout")) {
    return (
      <footer className="co-foot">
        <span>© {new Date().getFullYear()} It Flew!</span>
      </footer>
    );
  }
  return <>{children}</>;
}
