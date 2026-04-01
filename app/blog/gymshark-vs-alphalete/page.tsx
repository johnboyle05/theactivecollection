import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gymshark vs Alphalete — Which Is Worth Your Money? | The Active Collection",
  description: "A head-to-head comparison of Gymshark and Alphalete across fit, fabric quality, price, and value. Which brand actually delivers for gym training?",
};

// ─── TEMPLATE: COMPARISON ARTICLE ───────────────────────────────────────────
// Use this layout for head-to-head brand comparisons.
// Sections: intro → verdict summary → detailed breakdown by category → conclusion
// ─────────────────────────────────────────────────────────────────────────────

export default function GymsharkVsAlphaletePage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#949292]">
          <Link href="/blog" className="hover:text-[#262626] transition-colors">Journal</Link>
          <span>·</span>
          <span>Comparison</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#f0f0ff] text-[#4040cc]">Comparison</span>
            <span className="text-sm text-[#949292]">April 2025 · 6 min read</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium text-[#262626] leading-tight mb-6">
            Gymshark vs Alphalete — Which Is Actually Worth Your Money?
          </h1>
          <p className="text-xl text-[#6D6C6C] leading-relaxed">
            Both brands have built massive communities off the back of gym culture. But when it comes to the actual product, which one delivers?
          </p>
        </header>

        {/* Quick Verdict Box */}
        <div className="mb-12 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-[#949292] mb-2">Best for</p>
            <p className="text-lg font-medium text-[#262626] mb-1">Gymshark</p>
            <p className="text-sm text-[#6D6C6C]">Accessible pricing, women's seamless sets, gym-to-casual wear</p>
          </div>
          <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-[#949292] mb-2">Best for</p>
            <p className="text-lg font-medium text-[#262626] mb-1">Alphalete</p>
            <p className="text-sm text-[#6D6C6C]">Serious lifters, collections built around training style, community</p>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose-content space-y-10 text-[#383232]">

          <section>
            <h2 className="text-2xl font-medium text-[#262626] mb-4">The background</h2>
            <p className="text-lg leading-relaxed text-[#555555] mb-4">
              Gymshark and Alphalete both grew out of the same early-2010s fitness influencer boom, and both have since scaled into serious brands. But they've taken very different paths — and that's reflected in the product.
            </p>
            <p className="text-lg leading-relaxed text-[#555555]">
              Gymshark went mass-market early and has become one of the most recognised activewear names globally. Alphalete, founded by Christian Guzman, has stayed closer to its bodybuilding and functional fitness roots — and recently doubled down on that with the launch of Alphaland, an 18.5-acre gym complex in Texas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-[#262626] mb-4">Fit & construction</h2>
            <p className="text-lg leading-relaxed text-[#555555] mb-4">
              <strong className="text-[#262626]">Gymshark</strong> has become particularly well-regarded for their women's seamless range — the contouring seams and four-way stretch work well, and the sizing is consistent. The men's range is solid but less distinctive.
            </p>
            <p className="text-lg leading-relaxed text-[#555555]">
              <strong className="text-[#262626]">Alphalete</strong> takes a collections approach — Seamless, Pump, Aura, Tenacity — each designed with a specific training context in mind. If you train heavy, the Pump collection is built to show off your physique mid-session in a way most brands don't specifically cater for.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-[#262626] mb-4">Fabric quality</h2>
            <p className="text-lg leading-relaxed text-[#555555] mb-4">
              Both brands use quality fabrics, but Alphalete edges it at the premium end of their range. Gymshark's strength is consistency — you know what you're getting, and it holds up well over time.
            </p>
            <p className="text-lg leading-relaxed text-[#555555]">
              Worth noting: Gymshark's pricing is generally lower, so value-for-money is closer than a straight quality comparison suggests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-[#262626] mb-4">Price</h2>
            <div className="rounded-2xl bg-[#F9F9F9] p-6 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[#ededed]">
                <span className="text-[#6D6C6C]">Gymshark leggings</span>
                <span className="font-medium text-[#262626]">£35–£55</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#ededed]">
                <span className="text-[#6D6C6C]">Gymshark shorts</span>
                <span className="font-medium text-[#262626]">£25–£40</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#ededed]">
                <span className="text-[#6D6C6C]">Alphalete leggings</span>
                <span className="font-medium text-[#262626]">$60–$80</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#6D6C6C]">Alphalete shorts</span>
                <span className="font-medium text-[#262626]">$45–$65</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-[#262626] mb-4">The verdict</h2>
            <p className="text-lg leading-relaxed text-[#555555] mb-4">
              If you're newer to investing in gym kit and want solid, stylish gear at an accessible price point — start with Gymshark. The quality-to-cost ratio is hard to beat, particularly for women's training sets.
            </p>
            <p className="text-lg leading-relaxed text-[#555555]">
              If you train seriously and want gear that's been built with specific lifting contexts in mind — Alphalete is worth the extra outlay. The collections approach means there's something specifically right for how you train.
            </p>
          </section>

        </div>

        {/* Brand Links */}
        <div className="mt-16 grid grid-cols-2 gap-4">
          <Link
            href="/brands/gymshark"
            className="flex flex-col gap-1 rounded-2xl border border-[#F2F2F2] bg-white p-5 hover:border-zinc-300 transition-colors"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-[#949292]">View brand</p>
            <p className="text-lg font-medium text-[#262626]">Gymshark →</p>
          </Link>
          <Link
            href="/brands/alphalete"
            className="flex flex-col gap-1 rounded-2xl border border-[#F2F2F2] bg-white p-5 hover:border-zinc-300 transition-colors"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-[#949292]">View brand</p>
            <p className="text-lg font-medium text-[#262626]">Alphalete →</p>
          </Link>
        </div>

        {/* Back to blog */}
        <div className="mt-10">
          <Link href="/blog" className="text-sm text-[#949292] hover:text-[#262626] transition-colors">
            ← Back to Journal
          </Link>
        </div>

      </article>
    </div>
  );
}
