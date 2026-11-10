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
  title: { default: "It Flew! | Invisible Thread Magic Reel", template: "%s | It Flew!" },
  description: "It Flew! makes Invisible Thread: a pocket-sized invisible thread reel for magic levitations. Make anything fly. Ships within 48 hours, 30-day returns.",
  applicationName: "It Flew!",
  keywords: ["It Flew", "itflew", "It Flew magic", "invisible thread", "invisible thread reel", "ITR magic", "levitation magic trick", "floating magic trick"],
  metadataBase: new URL("https://itflew.com"),
  openGraph: {
    title: "It Flew! | Invisible Thread Magic Reel",
    description: "Make anything fly. A pocket-sized invisible thread reel for levitations, animations and vanishes.",
    url: "https://itflew.com",
    siteName: "It Flew!",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
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
