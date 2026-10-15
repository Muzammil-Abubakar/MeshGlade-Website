import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const pages = ["", "/services", "/projects", "/why-us", "/pricing", "/about", "/contact", "/contact/brief", "/privacy-policy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
