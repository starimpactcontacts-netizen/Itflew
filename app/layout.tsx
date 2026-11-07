import type { Metadata, Viewport } from "next";
import { Archivo, Bebas_Neue } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Archivo({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "It Flew! — The ITR Invisible Thread Reel",
  description: "Make it float. The ITR: a small invisible thread reel for levitations, animations and vanishes.",
  metadataBase: new URL("https://itflew.com"),
};

export const viewport: Viewport = { themeColor: "#121214" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <footer className="footer">
            <Link href="/" aria-label="It Flew! home">
              <Image src="/wordmark-cream.png" alt="It Flew!" width={672} height={140} className="footer-mark" />
            </Link>
            <nav>
              <Link href="/products/itr">Shop</Link>
              <Link href="/#how">How it works</Link>
              <Link href="/#list">Join the list</Link>
            </nav>
            <p className="muted small">© {new Date().getFullYear()} It Flew! — A magician never reveals. We just sell the reel.</p>
          </footer>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
