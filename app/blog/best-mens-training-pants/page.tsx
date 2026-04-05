import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Best Men's Training Pants Right Now | The Active Collection",
  description: "From CrossFit to the commute, these are the men's training pants consistently delivering on fit, fabric, and versatility — ranked and reviewed.",
};

// ─── TEMPLATE: BEST-OF ROUNDUP ───────────────────────────────────────────────
// Use this layout for ranked or curated lists of brands.
// Sections: intro → numbered brand entries → conclusion CTA
// Each brand entry has: number, name, best-for tag, description, link
// ─────────────────────────────────────────────────────────────────────────────

const picks = [
  {
    rank: 1,
    name: "Lululemon ABC Jogger",
    slug: "lululemon",
    bestFor: "All-round versatility",
    price: "£108",
    body: "The benchmark. ABC stands for Anti-Ball Crushing — a wide-panelled ergonomic gusset that eliminates crotch tension entirely. Paired with Warpstreme fabric (a warp-knit polyester developed with a Japanese mill), you get a pant that resists pilling, retains its shape wash after wash, and moves with you in every direction. The result: a training pant that looks as good grabbing a coffee as it does in a warm-up. Three inseam options. Multiple colourways. The closest thing to a perfect all-rounder this category has.",
  },
  {
    rank: 2,
    name: "Ten Thousand Interval Pant",
    slug: "ten-thousand",
    bestFor: "Serious training, no compromise",
    price: "£95",
    body: "If the ABC is the do-everything pant, the Interval is the one you reach for when the session is actually demanding. 63% nylon, 37% spandex interlock with Proplyo Stretch™ technology, permanent silver ion anti-odour treatment, and bonded hems that don't fray. The Every Session Carry™ pocket system features no-bounce zippered hip pockets — actually stay put mid-set. Ten Thousand built this with input from U.S. Special Operations Forces. That's the standard it holds itself to, and it shows. The most durable pant on this list.",
  },
  {
    rank: 3,
    name: "Vuori Sunday Performance Jogger",
    slug: "vuori",
    bestFor: "Comfort-first training",
    price: "£75",
    body: "Vuori's answer to the ABC — softer, slightly cheaper, and with a more pronounced taper. 88% recycled polyester, 12% elastane, five pockets (two front, two rear zip, one left-leg zip). The real difference is the feel: where Warpstreme is technical and crisp, the Sunday feels closer to a second skin. It's a better casual pant and a better lounge pant than Lululemon's equivalent. It's also the most sustainably produced option on this list — Vuori is Climate Neutral certified and the fabric is made from recycled bottles. One caveat: only a 28\" inseam available.",
  },
  {
    rank: 4,
    name: "Rhone Commuter Pant",
    slug: "rhone",
    bestFor: "Office to gym without changing",
    price: "£110",
    body: "The professional crossover option. Rhone's Flex-Knit fabric is 4-way stretch, wrinkle-resistant, and light enough to wear all day. What separates it from Lululemon's Commission is the GoldFusion™ anti-odour technology — permanently infused gold particles neutralise bacteria at the fibre level. Wear it to a meeting in the morning, straight to a training session at lunch, and it'll still smell clean. Gusseted leg construction handles athletic builds well. Available in slim, regular, and jogger cuts. The one to buy if your life doesn't leave room for multiple wardrobes.",
  },
  {
    rank: 5,
    name: "Gymshark Apex Technical Jogger",
    slug: "gymshark",
    bestFor: "Best value performance",
    price: "£50",
    body: "The entry point into proper performance pants. BRZE technology maps ventilation to high-heat zones; ESNCE anti-odour treatment keeps them fresher for longer; bonded zip side pockets stay secure when you move. The Apex is Gymshark at its most technical — a serious step up from their cotton-blend Crest range. At roughly half the price of Lululemon, you do give up long-term durability and the refinement of higher-end fabrics. But for the price, few brands come close.",
  },
  {
    rank: 6,
    name: "ASRV Tetra-Lite® Jogger",
    slug: "asrv",
    bestFor: "Premium tech with aesthetic edge",
    price: "£130+",
    body: "ASRV approaches fabric differently from everyone on this list. Their Tetra-Lite® material is ultra-lightweight, DWR water-repellent, and engineered for stretch across every plane of movement. The result is a pant that looks minimal and considered, handles hard sessions without protest, and holds its shape and feel well beyond what cheaper options manage. Multiple silhouettes — Cargo High Rib, Moto, Cuffed Training — give you real options depending on the aesthetic you're after. The most expensive option here; also one of the most technically impressive.",
  },
  {
    rank: 7,
    name: "Alphalete Apex Jogger",
    slug: "alphalete",
    bestFor: "Gym-focused, athletic builds",
    price: "£65",
    body: "Alphalete was built around gym culture, and the Apex Jogger reflects that. A spandex-heavy polyester blend gives it a supportive, muscle-following fit that holds up during heavy squats without riding up or pulling. The anti-ride waistband stays in place throughout a session. The trade-off is that the tight, athletic fit isn't for everyone — if you prefer a relaxed silhouette or have a slimmer build, size down won't serve you. But for lifters who want a pant that moves with their training rather than against it, the Apex earns its place.",
  },
];

export default function BestMensTrainingPantsPage() {
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
            <span className="text-sm text-[#949292]">April 2025 · 7 min read</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium text-[#262626] leading-tight mb-6">
            The Best Men&apos;s Training Pants Right Now
          </h1>
          <p className="text-xl text-[#6D6C6C] leading-relaxed">
            Fit, fabric, and versatility. The pants that hold up when your training does — and look good doing it.
          </p>
        </header>

        {/* Intro */}
        <div className="mb-12 space-y-4">
          <p className="text-lg leading-relaxed text-[#555555]">
            Finding a good training pant is harder than it should be. The problem isn&apos;t lack of options — it&apos;s that most pairs fail the moment training gets serious. Fabric pills after three months. Pockets bounce. The waistband rolls. Or the fit is technically right everywhere except the thighs, which is where it matters most for anyone who actually trains.
          </p>
          <p className="text-lg leading-relaxed text-[#555555]">
            These are the pairs that pass every test: the training session, the walk to the gym, the coffee after. Seven picks across every price point, from genuine budget options to the technically ambitious.
          </p>
        </div>

        {/* What to look for — quick callout */}
        <div className="mb-12 rounded-2xl bg-[#F9F9F9] p-6 sm:p-8">
          <h2 className="text-base font-medium text-[#262626] mb-3">What actually matters in a training pant</h2>
          <ul className="space-y-2">
            {[
              { label: "Gusset construction", body: "A crotch gusset eliminates tension during squats and lunges. Non-negotiable for athletic builds." },
              { label: "4-way stretch", body: "Fabric needs to move in every direction, not just forward-back. Check the spec before buying." },
              { label: "Anti-odour treatment", body: "Silver ions (Ten Thousand), GoldFusion™ (Rhone), or bamboo derivatives — permanent is better than topical." },
              { label: "Pocket security", body: "No-bounce zippered pockets. Deep enough for your phone. Simple requirement that most brands still get wrong." },
              { label: "Fabric durability", body: "Warp-knit constructions (Lululemon Warpstreme) resist pilling significantly better than standard interlock knits." },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-3 text-sm text-[#555555]">
                <span className="font-medium text-[#262626] flex-none">{item.label}:</span>
                {item.body}
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Picks */}
        <div className="space-y-8">
          {picks.map((pick) => (
            <div key={pick.slug + pick.rank} className="rounded-2xl border border-[#F2F2F2] bg-white p-6 sm:p-8">
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
                  <p className="text-xs text-[#949292] mb-3">{pick.price}</p>
                  <p className="text-[#555555] leading-relaxed mb-4">{pick.body}</p>
                  <Link
                    href={`/brands/${pick.slug}`}
                    className="text-sm font-medium text-[#262626] hover:text-[#6D6C6C] transition-colors"
                  >
                    View {pick.name.split(" ")[0]} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to choose */}
        <div className="mt-12 rounded-2xl bg-[#F9F9F9] p-6 sm:p-8">
          <h2 className="text-xl font-medium text-[#262626] mb-3">How to choose</h2>
          <div className="space-y-3 text-[#555555] leading-relaxed">
            <p>
              <strong className="text-[#262626]">Starting out or on a budget?</strong> The Gymshark Apex gives you genuine performance tech at a price that doesn&apos;t ask you to commit. The Vuori Sunday is worth the extra £25 if versatility matters.
            </p>
            <p>
              <strong className="text-[#262626]">Training seriously?</strong> Ten Thousand. The Interval Pant is built for sessions that break lesser gear. If you want something that doubles better as streetwear, the Lululemon ABC is still the benchmark.
            </p>
            <p>
              <strong className="text-[#262626]">Athletic build with big legs?</strong> Prioritise gusset construction and 4-way stretch. The ABC, Interval, and Rhone Commuter all accommodate this. Cuts and slim-fit Gymshark ranges don&apos;t.
            </p>
            <p>
              <strong className="text-[#262626]">Need something professional enough for the office?</strong> Rhone Commuter or Lululemon Commission. Both pass in most business-casual settings; Rhone edges it if odour management is a concern.
            </p>
          </div>
          <Link
            href="/"
            className="mt-5 inline-block text-sm font-medium text-[#262626] hover:text-[#6D6C6C] transition-colors"
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
