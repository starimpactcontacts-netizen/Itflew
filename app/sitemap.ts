import type { MetadataRoute } from "next";

const BASE = "https://itflew.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/products/levitation-pod", "/about", "/track", "/contact", "/shipping-returns", "/privacy", "/terms"].map((p) => ({
    url: BASE + p,
    changeFrequency: p === "" || p === "/products/levitation-pod" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/products/levitation-pod" ? 0.9 : p === "/about" ? 0.7 : 0.4,
    lastModified: new Date(),
  }));
}
