import type { MetadataRoute } from "next";

const BASE = "https://itflew.com";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/products/itr", "/track", "/contact", "/shipping-returns", "/privacy", "/terms"].map((p) => ({
    url: BASE + p,
    changeFrequency: p === "" || p === "/products/itr" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/products/itr" ? 0.9 : 0.4,
  }));
}
