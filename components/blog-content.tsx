"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { ARTICLES, type Article } from "@/lib/blog-articles";

const FEATURED_HEIGHT = 540; // px — height of the sticky featured panel
const STICKY_TOP = 112;      // nav height (~92px) + 20px gap
const CATEGORIES = ["All", "Brand Reviews", "Roundups", "Comparisons"];

const CATEGORY_MAP: Record<string, string> = {
  "Brand Reviews": "Brand Review",
  Roundups: "Roundup",
  Comparisons: "Comparison",
};

function categoryMatch(articleCategory: string, filter: string) {
  if (filter === "All") return true;
  return articleCategory === (CATEGORY_MAP[filter] ?? filter);
}

function FeaturedCard({ article }: { article: Article }) {
  const inner = (
    <div
      className={`relative h-full w-full overflow-hidden ${article.imageUrl ? "" : `bg-gradient-to-br ${article.gradient}`}`}
      style={article.imageUrl ? { backgroundImage: `url(${article.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="bg-white/50 backdrop-blur-md p-4">
          <h3 className="text-base font-medium leading-snug text-[#383232] sm:text-lg">
            {article.title}
          </h3>
          <p className="mt-1.5 text-xs text-[#383232]/50">
            {article.date} · {article.readTime}
          </p>
        </div>
      </div>
    </div>
  );

  if (article.slug === "#") return <div className="h-full w-full">{inner}</div>;
  return (
    <Link href={`/blog/${article.slug}`} className="block h-full w-full transition-opacity hover:opacity-90">
      {inner}
    </Link>
  );
}

function AllArticleCard({ article }: { article: Article }) {
  const inner = (
    <div className="flex flex-col overflow-hidden border border-[#F2F2F2] bg-white transition-colors hover:border-zinc-300">
      <div className={`relative h-44 flex-none bg-gradient-to-br ${article.gradient}`}>
        <div className="absolute inset-0 bg-black/10" />
      </div>
      <div className="flex flex-col gap-2 p-5">
        <span className="text-xs font-medium uppercase tracking-widest text-[#949292]">
          {article.category}
        </span>
        <h3 className="text-base font-medium leading-snug text-[#262626]">{article.title}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-[#6D6C6C]">{article.excerpt}</p>
        <p className="mt-1 text-xs text-[#949292]">
          {article.date} · {article.readTime}
        </p>
      </div>
    </div>
  );

  if (article.slug === "#") return inner;
  return <Link href={`/blog/${article.slug}`}>{inner}</Link>;
}

export function BlogContent() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxTranslateRef = useRef(0);
  const [wrapperHeight, setWrapperHeight] = useState(FEATURED_HEIGHT);
  const [activeFilter, setActiveFilter] = useState("All");

  const featured = ARTICLES.filter((a) => a.featured).slice(0, 5);
  const filteredArticles = ARTICLES.filter((a) => categoryMatch(a.category, activeFilter));

  // Measure horizontal overflow of the track
  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const overflow = Math.max(0, trackRef.current.scrollWidth - trackRef.current.clientWidth);
      maxTranslateRef.current = overflow;
      setWrapperHeight(FEATURED_HEIGHT + overflow);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll-jacking: vertical scroll → horizontal translate (desktop only)
  // Starts once the sticky panel reaches STICKY_TOP from the viewport top
  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current || !trackRef.current || window.innerWidth < 768) return;
      const wrapperTop = wrapperRef.current.getBoundingClientRect().top;
      const progress = Math.max(0, STICKY_TOP - wrapperTop);
      const ratio = Math.min(1, progress / Math.max(1, maxTranslateRef.current));
      trackRef.current.style.transform = `translateX(-${ratio * maxTranslateRef.current}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fbfbfb]">

      {/* Page header — matches max-w-6xl / px-5 sm:px-8 */}
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-8">
        <h1 className="mb-4 text-5xl font-medium text-[#262626]">Journal</h1>
        <p className="max-w-xl text-lg text-[#6D6C6C]">
          Brand comparisons, honest reviews, and guides to help you find the gear that suits how
          you actually train.
        </p>
      </div>

      {/* ── Featured: mobile — plain horizontal scroll ── */}
      <div className="w-full bg-[#f4f4f4] sm:hidden">
        <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
          <h2 className="mb-4 text-lg font-medium text-[#383232]">Featured</h2>
        </div>
        <div
          className="no-scrollbar flex gap-3 overflow-x-auto pl-5 pb-8"
          style={{ height: `${FEATURED_HEIGHT * 0.75}px` }}
        >
          {featured.map((article) => (
            <div key={article.slug + article.title} className="h-full w-[78vw] flex-none last:pr-5">
              <FeaturedCard article={article} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured: desktop — scroll-jacking wrapper ── */}
      <div
        ref={wrapperRef}
        className="hidden sm:block"
        style={{ height: `${wrapperHeight}px` }}
      >
        {/* Sticky panel — sticks 20px below the nav */}
        <div
          className="sticky overflow-hidden bg-[#f4f4f4]"
          style={{ top: `${STICKY_TOP}px`, height: `${FEATURED_HEIGHT}px` }}
        >
          {/* Featured label */}
          <div
            className="pt-6 pb-4"
            style={{ paddingLeft: "max(20px, calc((100vw - 72rem) / 2 + 20px))" }}
          >
            <h2 className="text-2xl font-medium text-[#383232]">Featured</h2>
          </div>
          {/* Track — left-aligned to page margin, overflows right */}
          <div
            ref={trackRef}
            className="flex gap-3 pb-6"
            style={{
              height: `${FEATURED_HEIGHT - 64}px`,
              willChange: "transform",
              paddingLeft: "max(20px, calc((100vw - 72rem) / 2 + 20px))",
            }}
          >
            {/* Large card */}
            <div className="h-full w-[850px] flex-none">
              <FeaturedCard article={featured[0]} />
            </div>
            {/* Column 1 */}
            <div className="flex h-full w-[390px] flex-none flex-col gap-3">
              <div className="flex-1"><FeaturedCard article={featured[1]} /></div>
              <div className="flex-1"><FeaturedCard article={featured[2]} /></div>
            </div>
            {/* Column 2 */}
            <div className="flex h-full w-[390px] flex-none flex-col gap-3 pr-8">
              <div className="flex-1"><FeaturedCard article={featured[3]} /></div>
              <div className="flex-1"><FeaturedCard article={featured[4]} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── All articles — flows directly after wrapper, no extra gap ── */}
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-16 sm:px-8">
        <h2 className="mb-6 text-2xl font-medium text-[#262626]">All articles</h2>

        {/* Filter pills */}
        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`flex-none rounded-full border px-4 py-2 text-sm transition-colors ${
                activeFilter === cat
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-[#E3E3E3] bg-white text-[#6A6262] hover:border-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <AllArticleCard key={article.slug + article.title} article={article} />
          ))}
        </div>
      </div>

    </div>
  );
}
