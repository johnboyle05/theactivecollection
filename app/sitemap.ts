import type { MetadataRoute } from "next";
import { getBrands } from "@/lib/brands";

const BASE_URL = "https://theactivecollection.co";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brands = await getBrands();

  const brandUrls = brands.map((brand) => ({
    url: `${BASE_URL}/brands/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...brandUrls,
  ];
}
