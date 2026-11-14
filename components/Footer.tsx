import Link from "next/link";
import WaitlistForm from "./WaitlistForm";

const GROUPS: { title: string; links: [string, string][] }[] = [
  { title: "Shop", links: [["Levitation Pod", "/products/levitation-pod"], ["How it flies", "/#how"], ["About It Flew!", "/about"]] },
  { title: "Customer Support", links: [["Track your order", "/track"], ["Shipping & returns", "/shipping-returns"], ["Contact us", "/contact"], ["support@itflew.com", "mailto:support@itflew.com"]] },
  { title: "Legal & Privacy", links: [["Terms of sale", "/terms"], ["Privacy policy", "/privacy"], ["contact@itflew.com", "mailto:contact@itflew.com"]] },
];

export default function Footer() {
  return (
    <footer className="fs" id="list">
      <div className="fs-sign">
        <h2 className="fs-title">Sign up &amp; save</h2>
        <p className="fs-sub">Join the list for 10% off your first order, plus new drops and restocks first.</p>
        <WaitlistForm />
        <div className="fs-social">
          <a href="https://www.instagram.com/itflewmagic" target="_blank" rel="noopener noreferrer" aria-label="It Flew! on Instagram (opens in a new tab)">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" /></svg>
          </a>
        </div>
      </div>
      <div className="fs-acc">
        {GROUPS.map((g) => (
          <details key={g.title}>
            <summary>
              <span>{g.title}</span>
              <i aria-hidden />
            </summary>
            <ul>
              {g.links.map(([label, href]) => (
                <li key={label}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </details>
        ))}
      </div>
      <p className="fs-copy">It Flew! · Stockholm, Sweden · <a href="mailto:contact@itflew.com">contact@itflew.com</a><br />© {new Date().getFullYear()} It Flew! All rights reserved.</p>
    </footer>
  );
}
