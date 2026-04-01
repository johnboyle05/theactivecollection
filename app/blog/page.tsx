import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Activewear Guides & Brand Comparisons | The Active Collection",
  description: "In-depth activewear brand comparisons, honest reviews, and guides to help you find the gear that actually suits how you train.",
};

const articles = [
  {
    slug: "gymshark-vs-alphalete",
    category: "Comparison",
    title: "Gymshark vs Alphalete — Which Is Actually Worth Your Money?",
    excerpt:
      "Both brands have built massive communities off the back of gym culture. But when it comes to the actual product, which one delivers? We break down the fit, fabric, and value of each.",
    date: "April 2025",
    readTime: "6 min read",
  },
  {
    slug: "best-mens-activewear-brands",
    category: "Roundup",
    title: "The Best Men's Activewear Brands Right Now",
    excerpt:
      "From technical training gear to versatile athleisure, these are the brands consistently delivering on both performance and style — no filler, no fluff.",
    date: "April 2025",
    readTime: "8 min read",
  },
  {
    slug: "lululemon-review",
    category: "Brand Review",
    title: "Is Lululemon Actually Worth It in 2025?",
    excerpt:
      "Lululemon sits at the premium end of the market. The question everyone asks before buying: is it worth the price? After years of wearing it, here's our honest take.",
    date: "April 2025",
    readTime: "5 min read",
  },
];

const categoryColours: Record<string, string> = {
  Comparison: "bg-[#f0f0ff] text-[#4040cc]",
  Roundup: "bg-[#f0faf0] text-[#2a7a2a]",
  "Brand Review": "bg-[#fff7f0] text-[#cc6020]",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-[#949292] mb-3">The Active Collection</p>
          <h1 className="text-5xl font-medium text-[#262626] mb-4">Journal</h1>
          <p className="text-lg text-[#6D6C6C] max-w-xl">
            Brand comparisons, honest reviews, and guides to help you find the gear that suits how you actually train.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {articles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block rounded-2xl border border-[#F2F2F2] bg-white p-6 sm:p-8 hover:border-zinc-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColours[article.category]}`}>
                  {article.category}
                </span>
                {index === 0 ? (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#262626] text-white">
                    Latest
                  </span>
                ) : null}
              </div>
              <h2 className="text-xl sm:text-2xl font-medium text-[#262626] mb-3 group-hover:text-[#383232] transition-colors">
                {article.title}
              </h2>
              <p className="text-[#6D6C6C] leading-relaxed mb-5">{article.excerpt}</p>
              <div className="flex items-center gap-3 text-sm text-[#949292]">
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
