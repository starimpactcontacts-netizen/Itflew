import Link from "next/link";
import WaitlistForm from "./WaitlistForm";

const GROUPS: { title: string; links: [string, string][] }[] = [
  { title: "Shop", links: [["Invisible Thread", "/products/itr"], ["How it flies", "/#how"]] },
  { title: "Customer Support", links: [["Track your order", "/track"], ["Shipping & returns", "#"], ["Contact us", "#"]] },
  { title: "Legal & Privacy", links: [["Terms", "#"], ["Privacy", "#"]] },
];

export default function Footer() {
  return (
    <footer className="fs" id="list">
      <div className="fs-sign">
        <h2 className="fs-title">Sign up &amp; save</h2>
        <p className="fs-sub">Subscribe for new drops, restocks and the odd secret.</p>
        <WaitlistForm />
        <div className="fs-social">
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" /></svg>
          </a>
          <a href="#" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="24" height="26" fill="currentColor"><path d="M16.5 2h-3.2v13.2a3 3 0 1 1-2.6-3V9a6.2 6.2 0 1 0 5.8 6.2V8.6a7.6 7.6 0 0 0 4.3 1.4V6.8a4.3 4.3 0 0 1-4.3-4.3z" /></svg>
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
      <p className="fs-copy">© {new Date().getFullYear()} It Flew! All rights reserved.</p>
    </footer>
  );
}
