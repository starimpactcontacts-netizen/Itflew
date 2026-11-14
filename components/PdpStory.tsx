import Link from "next/link";
import TutorialVideo from "./TutorialVideo";
import { StepImage } from "./StepCard";
import { ITR } from "@/lib/products";
import { SHIP_COUNTRIES } from "@/lib/countries";

const STEPS = [
  ["Clip", "Clip the pod inside your collar or jacket. The thread runs out unseen."],
  ["Draw", "Pinch the tip and draw a length of invisible thread off the spool."],
  ["Hook", "Secretly hook the thread to the can, then step back with open hands."],
  ["Lift", "Lift your hands slowly and the can rises straight to you. It flew."],
];

const SPECS = [
  ["Size", "6.5 cm / 2.56 in pod"],
  ["Thread", "Ultra-fine, invisible on camera and up close"],
  ["Retraction", "Smooth and quiet, winds back into the pod"],
  ["Wear", "Clips inside a collar, jacket or pocket"],
  ["Level", "Beginner friendly, pro approved"],
  ["In the box", "1 × Levitation Pod"],
];

const FAQ = [
  ["Is it really invisible?", "Yes. The thread is ultra-fine, so on camera and from a few feet away it simply disappears. Watch the tutorial above and see for yourself."],
  ["I've never done magic. Can I do this?", "It's made for you. Clip it on, draw the thread, hook your object and lift. Most people land their first levitation within minutes using the tutorial."],
  ["What can I make fly?", "Light everyday things: a can, a ring, a card, a bill, a pen. Lift it, float it, make it dance, then let the thread wind back so there's nothing left to find."],
  ["How long does delivery take?", "We dispatch within 24–48 hours. Delivery time depends on where you are: standard shipping takes 7–12 business days, and orders to major cities usually arrive within 5–7 days of dispatch. Your exact dates show in the bag before you enter any details. Shipping is a flat $7 per order."],
  ["What if it's not for me?", "Return unused pods within 30 days for a full refund. No forms, just email support@itflew.com."],
  ["Is this the telekinesis prank trick?", "Yes. The Levitation Pod is the trick behind the viral telekinesis prank videos: clip it to your jacket, attach it to a can and lift your hands. People see the can move toward you with nothing touching it."],
  ["Who is behind It Flew!?", "It Flew! is a small magic brand based in Stockholm, Sweden. We sell one product, the Levitation Pod, and we answer every message ourselves. Reach us at support@itflew.com, orders@itflew.com or contact@itflew.com, or use the chat on any page."],
  ["Is checkout secure?", "Payments are processed by Stripe with bank-level encryption. We never see or store your card details. Apple Pay and all major cards are accepted."],
];

const SHIP_TO = [...SHIP_COUNTRIES];

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden><path d={d} /></svg>
);

const PROMISES = [
  ["M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "Ships within 48h", "Flat $7 per order"],
  ["M4 12a8 8 0 1 0 3-6.2M4 4v4h4", "30-day returns", "Full refund, no fuss"],
  ["M6 10V7a6 6 0 0 1 12 0v3M5 10h14v11H5zM12 14v3", "Secure checkout", "Encrypted by Stripe"],
  ["M4 5h16v11H9l-5 4zM8 9h8M8 12h5", "Real support", "Humans, not bots"],
];

export default function PdpStory() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: ITR.name,
      description: ITR.blurb,
      sku: "levitation-pod",
      category: "Magic tricks",
      brand: { "@type": "Brand", name: "It Flew!", sameAs: ["https://www.instagram.com/itflewmagic"] },
      image: ["https://itflew.com/product/reel-angle-v2.webp", "https://itflew.com/product/reel-front-v2.webp", "https://itflew.com/product/reel-jacket-v2.webp"],
      offers: {
        "@type": "Offer",
        price: ITR.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        url: "https://itflew.com/products/levitation-pod",
        seller: { "@id": "https://itflew.com/#organization" },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: "7.00", currency: "USD" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: SHIP_TO },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: 5, maxValue: 10, unitCode: "DAY" },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: SHIP_TO,
          returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 30,
          returnMethod: "https://schema.org/ReturnByMail",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "It Flew!", item: "https://itflew.com" },
        { "@type": "ListItem", position: 2, name: "Levitation Pod", item: "https://itflew.com/products/levitation-pod" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];

  return (
    <>
      <ul className="ps-promise">
        {PROMISES.map(([d, t, s]) => (
          <li key={t}>
            <Icon d={d} />
            <strong>{t}</strong>
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <section id="tutorial" className="ps-tut">
        <h2 className="ps-h2">Learn it in a minute</h2>
        <p className="ps-lede">Four moves. No experience needed. Watch once, then try it yourself.</p>
        <TutorialVideo />
        <ol className="ps-steps">
          {STEPS.map(([t, d], i) => (
            <li key={t}>
              <div className="ps-step-img"><StepImage i={i} /></div>
              <div className="ps-step-copy">
                <h3>{i + 1}. {t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="ps-sec">
        <h2 className="ps-h2">Small pod. Big moments.</h2>
        <dl className="ps-specs">
          {SPECS.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="ps-sec">
        <h2 className="ps-h2">Before you buy</h2>
        <div className="ps-faq">
          {FAQ.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}<i aria-hidden /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <p className="ps-help">
          Still unsure? <Link href="/contact">Write to us</Link> at support@itflew.com.
        </p>
      </section>


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
