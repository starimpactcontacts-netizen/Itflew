import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow full-quality output for the hero art
    qualities: [75, 100],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
