import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // old product URL → readable one (query strings like ?view=jacket carry over)
  async redirects() {
    return [
      { source: "/products/itr", destination: "/products/levitation-pod", permanent: true },
      { source: "/products/invisible-thread", destination: "/products/levitation-pod", permanent: true },
    ];
  },
  images: {
    // allow full-quality output for the hero art
    qualities: [75, 100],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
