import type { Metadata, Viewport } from "next";
import { Marcellus } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import SiteChrome from "@/components/SiteChrome";
import SupportChat from "@/components/SupportChat";
import CookieBanner from "@/components/CookieBanner";

// Closest open match to the Emaar-style flared Roman capitals.
const display = Marcellus({ weight: "400", subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: { default: "It Flew! | Levitation Pod", template: "%s | It Flew!" },
  description: "It Flew! is a Stockholm, Sweden brand behind the Levitation Pod: the trick behind the viral telekinesis prank. Clip it to your jacket, attach the can and let it fly. No magic skills needed.",
  applicationName: "It Flew!",
  keywords: ["It Flew", "itflew", "It Flew magic", "Levitation Pod", "levitation pod magic", "levitation magic trick", "make things float", "floating magic trick", "telekinesis prank", "telekinesis trick", "It Flew Stockholm", "magic for beginners"],
  metadataBase: new URL("https://itflew.com"),
  openGraph: {
    title: "It Flew! | Levitation Pod",
    description: "The trick behind the viral telekinesis prank. Clip it to your jacket, attach the can, let it fly. Made in Stockholm for complete beginners.",
    url: "https://itflew.com",
    siteName: "It Flew!",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  verification: { other: { "facebook-domain-verification": "pph04l0f80x6vsldy5exyknnvwmleb" } },
};

export const viewport: Viewport = { themeColor: "#121214" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <SiteChrome>
            <Footer />
          </SiteChrome>
          <CartDrawer />
          <SupportChat />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
