import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Best Men's Activewear Brands Right Now | The Active Collection",
  description: "From technical training gear to versatile athleisure, these are the men's activewear brands consistently delivering on both performance and style.",
};

// ─── TEMPLATE: BEST-OF ROUNDUP ───────────────────────────────────────────────
// Use this layout for ranked or curated lists of brands.
// Sections: intro → numbered brand entries → conclusion CTA
// Each brand entry has: number, name, best-for tag, description, link
// ─────────────────────────────────────────────────────────────────────────────

const picks = [
  {
    rank: 1,
    name: "Lululemon",
    slug: "lululemon",
    bestFor: "All-round performance & versatility",
    body: "The benchmark. Lululemon's proprietary fabrics — Luon, Nulu, Warpstreme — feel genuinely different from the competition, and the ABC Pant remains one of the best men's training trousers on the market. Yes, it's expensive. Yes, it's worth it.",
  },
  {
    rank: 2,
    name: "Ten Thousand",
    slug: "ten-thousand",
    bestFor: "Serious training, no frills",
    body: "If you actually train hard and want gear built exclusively around that, Ten Thousand is the one. No lifestyle plays, no gimmicks — just technically excellent kit that holds up under real pressure. The collaboration with U.S. Special Operations Forces tells you everything about the standard they hold themselves to.",
  },
  {
    rank: 3,
    name: "Vuori",
    slug: "vuori",
    bestFor: "Gym to everyday without changing",
    body: "Vuori has cracked the versatility problem better than almost anyone. Their joggers and shorts work just as well at brunch on Saturday as they do in a training session. If your life doesn't have room for separate wardrobes, start here.",
  },
  {
    rank: 4,
    name: "Rhone",
    slug: "rhone",
    bestFor: "Odour management & premium feel",
    body: "GoldFusion technology infuses gold particles into the fabric to neutralise bacteria — and it genuinely works. Kit that still smells fresh after workouts where it really shouldn't. The aesthetic is clean enough to wear beyond the gym too.",
  },
  {
    rank: 5,
    name: "ASRV",
    slug: "asrv",
    bestFor: "Technical innovation & dark aesthetics",
    body: "NASA thermoregulation tech, Kevlar fibres, antimicrobial Nano-Mesh — ASRV approaches materials differently from anyone else in this list. The dark, minimal aesthetic suits people who want gear that looks as serious as it performs.",
  },
];

export default function BestMensActivewearPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb]">
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-[#949292]">
          <Link href="/blog" className="hover:text-[#262626] transition-colors">Journal</Link>
          <span>·</span>
          <span>Roundup</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#f0faf0] text-[#2a7a2a]">Roundup</span>
            <span className="text-sm text-[#949292]">April 2025 · 8 min read</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium text-[#262626] leading-tight mb-6">
            The Best Men's Activewear Brands Right Now
          </h1>
          <p className="text-xl text-[#6D6C6C] leading-relaxed">
            No filler, no brands-that-paid-to-be-here. Just the ones consistently delivering on both performance and style.
          </p>
        </header>

        {/* Intro */}
        <div className="mb-12 space-y-4">
          <p className="text-lg leading-relaxed text-[#555555]">
            The men's activewear space has exploded over the last five years. What was once a choice between a few big sportswear names is now a genuinely crowded market with brands bringing real technical innovation, considered design, and strong fit options for athletic builds.
          </p>
          <p className="text-lg leading-relaxed text-[#555555]">
            These are our current picks — updated regularly as the market evolves.
          </p>
        </div>

        {/* Brand Picks */}
        <div className="space-y-8">
          {picks.map((pick) => (
            <div key={pick.slug} className="rounded-2xl border border-[#F2F2F2] bg-white p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <span className="text-4xl font-medium text-[#ededed] leading-none flex-none">
                  {String(pick.rank).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="text-xl font-medium text-[#262626]">{pick.name}</h2>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F9F9F9] text-[#6D6C6C]">
                      {pick.bestFor}
                    </span>
                  </div>
                  <p className="text-[#555555] leading-relaxed mb-4">{pick.body}</p>
                  <Link
                    href={`/brands/${pick.slug}`}
                    className="text-sm font-medium text-[#262626] hover:text-[#6D6C6C] transition-colors"
                  >
                    View {pick.name} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="mt-12 rounded-2xl bg-[#F9F9F9] p-6 sm:p-8">
          <h2 className="text-xl font-medium text-[#262626] mb-3">How to choose</h2>
          <p className="text-[#555555] leading-relaxed mb-4">
            If you're starting out, Vuori or Gymshark give you the best entry point — quality that holds up without the premium price tag. If you train seriously and want to invest properly, Lululemon and Ten Thousand are hard to beat. And if you want something technically different from the rest, ASRV is the one.
          </p>
          <Link
            href="/"
            className="text-sm font-medium text-[#262626] hover:text-[#6D6C6C] transition-colors"
          >
            Browse all brands →
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
