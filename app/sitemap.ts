import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://capture.royzmediagroup.com", changeFrequency: "monthly", priority: 1 },
    { url: "https://capture.royzmediagroup.com/room", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://capture.royzmediagroup.com/privacy", changeFrequency: "yearly", priority: 0.3 },
    { url: "https://capture.royzmediagroup.com/terms", changeFrequency: "yearly", priority: 0.3 },
  ];
}
