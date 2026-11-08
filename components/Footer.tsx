import Image from "next/image";
import Link from "next/link";

const GROUPS: { title: string; links: [string, string][] }[] = [
  { title: "Customer Support", links: [["Track your order", "/track"], ["Shipping & returns", "/track"], ["Contact us", "/track"]] },
  { title: "About It Flew!", links: [["How it flies", "/#how"], ["Invisible Thread", "/products/itr"]] },
  { title: "Follow It Flew!", links: [["Instagram", "#"], ["TikTok", "#"]] },
  { title: "Legal & Privacy", links: [["Terms", "#"], ["Privacy", "#"], ["Returns", "#"]] },
];

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="ft">
      <h2 className="ft-title">About</h2>
      <div className="ft-acc">
        {GROUPS.map((g) => (
          <details key={g.title}>
            <summary>
              {g.title}
              <Chevron />
            </summary>
            <ul>
              {g.links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <nav className="ft-grid" aria-label="Footer">
        <Link href="/">General</Link>
        <Link href="/track">Contact</Link>
        <span className="ft-region">
          US
          <svg viewBox="0 0 19 10" width="34" height="18" aria-label="United States">
            <rect width="19" height="10" fill="#b22234" />
            {[1, 3, 5, 7, 9].map((y) => (
              <rect key={y} y={(y * 10) / 13} width="19" height={10 / 13} fill="#fff" />
            ))}
            <rect width="7.6" height={(10 * 7) / 13} fill="#3c3b6e" />
          </svg>
        </span>
        <Link href="#">Terms</Link>
        <Link href="/" className="ft-logo" aria-label="It Flew! home">
          <Image src="/wordmark-black.png" alt="It Flew!" width={672} height={140} />
        </Link>
        <Link href="#">Privacy</Link>
        <Link href="/#how">How it flies</Link>
        <Link href="/track">Track order</Link>
        <Link href="#">Returns</Link>
      </nav>
      <p className="ft-copy">© {new Date().getFullYear()} It Flew! All rights reserved.</p>
    </footer>
  );
}
