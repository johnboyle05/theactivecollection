import { HomeFeed } from "@/components/home-feed";
import { getBrands } from "@/lib/brands";

export default async function Home() {
  const brands = await getBrands();
  const sheetName = process.env.GOOGLE_SHEETS_BRANDS_SHEET ?? "Brands";
  const publishedUrl = process.env.GOOGLE_SHEETS_PUBLISHED_URL ?? "";
  const sheetSourceLabel = publishedUrl
    ? publishedUrl.replace(/^https?:\/\//, "").slice(0, 60)
    : "not set";

  return (
    <div className="min-h-screen bg-[#fbfbfb] font-sans text-zinc-900">
      <nav className="top-0 z-30 border-b border-[#f2f2f2] bg-[#fbfbfb]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold uppercase text-white">
              AC
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-800">
              Active Collection
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-700">
            <a className="hover:text-zinc-900" href="#brands">
              Brands
            </a>
            <a className="hover:text-zinc-900" href="#filters">
              Filters
            </a>
            <a className="hover:text-zinc-900" href="#about">
              About
            </a>
          </div>
        </div>
      </nav>

      <header className="w-full">
        <div
          className="hero-wrapper w-full bg-cover bg-center bg-no-repeat mt-24 mb-12"
          style={{ backgroundImage: "url('/images/hero-squiggle.png')" }}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-12 sm:px-8 sm:py-16">
            <h1 className="max-w-3xl text-6xl font-medium text-[#383232]">
              Move beyond mainstream.
            </h1>
            <p className="max-w-2xl text-lg">
              Emerging activewear brands curated for performance, comfort, and modern everyday style.
            </p>
          </div>
        </div>
        
      </header>

      <main className="content mx-auto flex w-full max-w-6xl flex-col gap-10 py-12 sm:px-8">
        <section id="filters">
          <HomeFeed brands={brands} />
        </section>
      </main>
    </div>
  );
}
