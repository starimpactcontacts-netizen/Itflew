import type { Metadata, Viewport } from "next";
import { Marcellus } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

// Closest open match to the Emaar-style flared Roman capitals.
const display = Marcellus({ weight: "400", subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "It Flew! — Invisible Thread",
  description: "Make it float. Invisible Thread: a small reel for levitations, animations and vanishes.",
  metadataBase: new URL("https://itflew.com"),
};

export const viewport: Viewport = { themeColor: "#121214" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={display.variable}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
