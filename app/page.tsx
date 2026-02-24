import { HomeShell } from "@/components/home-shell";
import { getBrands } from "@/lib/brands";

export default async function Home() {
  const brands = await getBrands();
  const sheetName = process.env.GOOGLE_SHEETS_BRANDS_SHEET ?? "Brands";
  const publishedUrl = process.env.GOOGLE_SHEETS_PUBLISHED_URL ?? "";
  const sheetSourceLabel = publishedUrl
    ? publishedUrl.replace(/^https?:\/\//, "").slice(0, 60)
    : "not set";

  return (
    <HomeShell brands={brands} />
  );
}
