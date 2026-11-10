export type Product = {
  slug: string;
  name: string;
  short: string;
  price: number; // USD — placeholder, set the real price here
  blurb: string;
  details: string[];
};

export const ITR: Product = {
  slug: "invisible-thread",
  name: "Invisible Thread",
  short: "Small Invisible Thread Reel",
  price: 19,
  blurb:
    "A pocket-sized reel loaded with invisible thread. Clip it on, pull it out, and make rings, bills and cards rise from your fingertips — then let it all vanish back into the reel.",
  details: [
    "Compact reel — fits a pocket or clips under a jacket",
    "Loaded with ultra-fine invisible thread",
    "Smooth, quiet retraction",
    "Levitations, animations and vanishes",
    "Beginner friendly, pro approved",
  ],
};

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
