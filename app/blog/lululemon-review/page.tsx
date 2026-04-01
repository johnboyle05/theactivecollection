import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is Lululemon Worth It in 2025? Honest Review | The Active Collection",
  description: "Lululemon sits at the premium end of the activewear market. After years of wearing it, here's our honest take on whether it's actually worth the price.",
};

// ─── TEMPLATE: BRAND DEEP-DIVE / REVIEW ─────────────────────────────────────
// Use this layout for single-brand honest reviews.
// Sections: intro → quick verdict → detailed sections → pros/cons → conclusion
// ─────────────────────────────────────────────────────────────────────────────

const pros = [
  "Fabric quality that genuinely stands apart from the competition",
  "Exceptional durability — these pieces last years, not months",
  "ABC Pant remains the best men's training trouser on the market",
  "Versatile enough to wear beyond the gym",
  "Consistent sizing across the range",
];

const cons = [
  "Premium pricing — you'll feel it",
  "Some styles lean heavily into the brand's aesthetic which isn't for everyone",
  "The women's range is significantly deeper than the men's",
];

export default function LululemonReviewPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#949292]">
          <Link href="/blog" className="hover:text-[#262626] transition-colors">Journal</Link>
          <span>·</span>
          <span>Brand Review</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#fff7f0] text-[#cc6020]">Brand Review</span>
            <span className="text-sm text-[#949292]">April 2025 · 5 min read</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium text-[#262626] leading-tight mb-6">
            Is Lululemon Actually Worth It in 2025?
          </h1>
          <p className="text-xl text-[#6D6C6C] leading-relaxed">
            Lululemon sits at the premium end of the market. The question everyone asks before buying: is it worth the price? After years of wearing it, here's our honest take.
          </p>
        </header>

        {/* Quick Verdict */}
        <div className="mb-12 rounded-2xl border border-[#F2F2F2] bg-white p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-widest text-[#949292] mb-4">Quick verdict</p>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: "Fabric quality", score: "9/10" },
              { label: "Value for money", score: "7/10" },
              { label: "Versatility", score: "9/10" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-2xl font-medium text-[#262626] mb-1">{item.score}</p>
                <p className="text-xs text-[#949292]">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-[#555555] text-sm leading-relaxed border-t border-[#F2F2F2] pt-4 mt-4">
            Yes, it's worth it — if you train consistently and plan to wear the pieces often enough to justify the spend. The quality and durability are real, not marketing.
          </p>
        </div>

        {/* Article Body */}
        <div className="space-y-10 text-[#383232]">

          <section>
            <h2 className="text-2xl font-medium text-[#262626] mb-4">What makes Lululemon different</h2>
            <p className="text-lg leading-relaxed text-[#555555] mb-4">
              Lululemon didn't invent premium activewear, but they made it mainstream — and the reason they've held that position is that the product consistently backs up the price tag. The fabrics are the story: Luon, Nulu, Warpstreme, and Everlux are all proprietary blends that genuinely feel and perform differently from standard polyester-spandex.
            </p>
            <p className="text-lg leading-relaxed text-[#555555]">
              Luon — their original fabric — has a compression and softness that's hard to describe until you've worn it. Nulu is even softer, designed for yoga and low-impact training. Warpstreme is their technical performance fabric for high-intensity work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-[#262626] mb-4">The ABC Pant</h2>
            <p className="text-lg leading-relaxed text-[#555555] mb-4">
              Anti-Ball Crushing. It's a ridiculous name for a genuinely excellent product. The ABC Pant has become one of the best men's training trousers on the market — not because of the name, but because the cut is specifically designed for athletic bodies, with extra room through the thigh and seat without looking baggy.
            </p>
            <p className="text-lg leading-relaxed text-[#555555]">
              The Warpstreme version is technical enough for the gym, clean enough for the office, and versatile enough for everything in between. If you're going to try one Lululemon product, this is it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-[#262626] mb-4">The price question</h2>
            <p className="text-lg leading-relaxed text-[#555555] mb-4">
              A pair of Lululemon leggings runs £88–£128. ABC Pants are £118+. That's real money, and it's worth being honest about that.
            </p>
            <p className="text-lg leading-relaxed text-[#555555]">
              The counter-argument — and it's a genuine one — is durability. These pieces last. We've worn Lululemon kit through hundreds of sessions without it pilling, losing shape, or fading. When you factor in the lifespan versus a cheaper alternative you replace annually, the cost per wear often comes out ahead.
            </p>
          </section>

          {/* Pros & Cons */}
          <section>
            <h2 className="text-2xl font-medium text-[#262626] mb-6">Pros & cons</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#f0faf0] p-5">
                <p className="text-sm font-medium text-[#2a7a2a] mb-3">The good</p>
                <ul className="space-y-2">
                  {pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-[#555555]">
                      <span className="text-[#2a7a2a] mt-0.5 flex-none">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-[#fff7f0] p-5">
                <p className="text-sm font-medium text-[#cc6020] mb-3">Worth knowing</p>
                <ul className="space-y-2">
                  {cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-[#555555]">
                      <span className="text-[#cc6020] mt-0.5 flex-none">–</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-medium text-[#262626] mb-4">The verdict</h2>
            <p className="text-lg leading-relaxed text-[#555555] mb-4">
              If you train consistently and want activewear that holds up, feels exceptional, and works beyond the gym — Lululemon is worth it. Buy the ABC Pant first. If that converts you, the rest of the range will follow.
            </p>
            <p className="text-lg leading-relaxed text-[#555555]">
              If you're training occasionally or on a tighter budget, there are strong alternatives at lower price points. Vuori and VRST offer genuine quality without the premium outlay.
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/brands/lululemon"
            className="flex-1 flex flex-col gap-1 rounded-2xl border border-[#F2F2F2] bg-white p-5 hover:border-zinc-300 transition-colors"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-[#949292]">View brand profile</p>
            <p className="text-lg font-medium text-[#262626]">Lululemon →</p>
          </Link>
          <Link
            href="/brands/vuori"
            className="flex-1 flex flex-col gap-1 rounded-2xl border border-[#F2F2F2] bg-white p-5 hover:border-zinc-300 transition-colors"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-[#949292]">Looking for alternatives?</p>
            <p className="text-lg font-medium text-[#262626]">View Vuori →</p>
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
