import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Best Men's Workout Shorts Right Now | The Active Collection",
  description: "From CrossFit to casual wear, these are the men's workout shorts consistently delivering on fit, fabric, and versatility — tested and ranked.",
};

const picks = [
  {
    rank: 1,
    name: "Lululemon License to Train Short",
    slug: "lululemon",
    bestFor: "Lifting & gym training",
    price: "£58–£68",
    body: "Lululemon make two shorts worth knowing about — the Pace Breaker and the License to Train. If you lift, the License to Train is the one. It's slightly more structured, handles resistance training better, and doesn't have the liner durability issues that the Pace Breaker is known for. The Pace Breaker is the better pick if you run: it's lighter, more breathable, and the 4-way stretch shell moves effortlessly — but the liner can blow out during heavy squats, which is a real problem at this price. Buy the License to Train first. If you want a second pair for outdoor running in summer, add the Pace Breaker. Both come in 5\" and 7\" inseam — the 7\" is the better all-rounder, the 5\" is the gym aesthetic pick. One important note: the linerless Pace Breaker is see-through at the back. Don't learn that the hard way.",
  },
  {
    rank: 2,
    name: "Ten Thousand Interval Short",
    slug: "ten-thousand",
    bestFor: "CrossFit & barbell training",
    price: "£55–£60",
    body: "The most durable short on this list. Where the Lululemon Pace Breaker liner can fail during squats, the Interval holds up — consistently. The 4-way stretch shell handles everything from heavy lifting to plyometrics without protest, and the construction is noticeably more abrasion-resistant than most competitors. The zip pocket on the side actually locks your phone down during a run, unlike the Pace Breaker's pocket which lets the phone flop around. The Session Short is Ten Thousand's lighter, more minimal option — great for pure running and cardio, but the pocket is too small for most modern phones, which is a genuine frustration. For most people, the Interval is the better call. One durability note: the waistband can lose its shape after 18 months or so of regular wear. Wash on cold, air dry, and you'll push that timeline significantly further.",
  },
  {
    rank: 3,
    name: "Vuori Kore Short",
    slug: "vuori",
    bestFor: "Gym to casual — all-day wear",
    price: "£65",
    body: "Vuori's approach to shorts is the same as their approach to everything else: make it comfortable enough to wear all day, technical enough to train in, and minimal enough to look good doing both. The Kore Short delivers on that brief. The EcoVero blend is soft without feeling flimsy, moves well through a full range of motion, and doesn't scream activewear when you're off the gym floor. It's not the short you reach for when a session is truly demanding — the Ten Thousand Interval handles that better — but for everything else it's hard to beat. If versatility across training, errands, and casual wear is the priority, start here.",
  },
  {
    rank: 4,
    name: "Rhone Mako Short",
    slug: "rhone",
    bestFor: "All-round everyday short",
    price: "£75",
    body: "The Mako is Rhone's most versatile short and the one consistently recommended as the best all-around option. It has the right amount of stretch without feeling like compression wear, a clean enough look to wear outside the gym without announcing itself, and an 8\" inseam that works for most builds. The zip pocket fits a phone. The waistband is well-constructed and sits well throughout a session. It doesn't have the technical edge of the Ten Thousand Interval for serious training, but it's the better pick if you want one short that handles gym, errands, and casual weekend wear without switching between different pairs.",
  },
  {
    rank: 5,
    name: "Gymshark Arrival Short",
    slug: "gymshark",
    bestFor: "Best value, gym aesthetic",
    price: "£26–£30",
    body: "At around £26, the Arrival Short is the most accessible well-made gym short on this list. The material is solid — not technical in the way Ten Thousand or ASRV are, but genuinely comfortable and durable for the price. The cut is clean, the colour options are strong, and the 5\" inseam fits the current gym aesthetic without looking dated. If you're building out a rotation or looking for a short that won't hurt if it gets damaged, the Arrival is where to start. Gymshark's Sport Short is worth looking at if you want slightly more stretch for dynamic movement — the Arrival is the better-looking option; the Sport is the more functional one.",
  },
  {
    rank: 6,
    name: "CRZ Yoga Training Short",
    slug: "crz-yoga",
    bestFor: "Best Lululemon alternative",
    price: "£25–£35",
    body: "CRZ Yoga is the open secret of the activewear world. The brand produces shorts in fabrics that are genuinely comparable to Lululemon — similar 4-way stretch, similar moisture-wicking performance, similar feel — at roughly a third of the price. The Hommes training shorts in particular are worth trying: lightweight shell, built-in liner, and a cut that doesn't look budget despite the price tag. The brand lacks the brand equity and warranty support of Lululemon, and quality can be slightly inconsistent across colourways, but as a starting point for anyone not ready to spend £60+ on a single pair of shorts, CRZ Yoga is the most honest recommendation on this list.",
  },
  {
    rank: 7,
    name: "ASRV Tetra-Lite® Short",
    slug: "asrv",
    bestFor: "Premium technical performance",
    price: "£85–£95",
    body: "The most expensive short here by some margin, and the most technically ambitious. ASRV's Tetra-Lite® fabric is ultra-lightweight, DWR water-repellent, and engineered for stretch in every direction. The construction is meticulous — these are the shorts you reach for when the session genuinely demands the best your kit can offer. The aesthetic is dark and minimal, which works well in the gym and holds up outside it too. The price is real money, but so is the quality: multiple long-term reviewers report no shrinkage, no pilling, and no loss of feel after extended use. If you already own good pairs from Lululemon or Ten Thousand and want to upgrade, this is the next step.",
  },
];

export default function BestMensWorkoutShortsPage() {
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
            The Best Men&apos;s Workout Shorts Right Now
          </h1>
          <p className="text-xl text-[#6D6C6C] leading-relaxed">
            From CrossFit sessions to casual Saturdays — the shorts that hold up when your training does.
          </p>
        </header>

        {/* Intro */}
        <div className="mb-12 space-y-4">
          <p className="text-lg leading-relaxed text-[#555555]">
            A good workout short is harder to find than it should be. Most pairs fail in one of a few predictable ways: the liner blows out after heavy squats, the pocket won&apos;t fit a phone, the fabric pills after three months, or the fit is fine everywhere except the thighs. The search usually ends with two or three pairs from different brands filling different gaps.
          </p>
          <p className="text-lg leading-relaxed text-[#555555]">
            These are the seven that don&apos;t fail. Ranked by use case, tested across real training sessions, and covering every price point from £26 to £95.
          </p>
        </div>

        {/* Inseam callout */}
        <div className="mb-12 rounded-2xl bg-[#F9F9F9] p-6 sm:p-8">
          <h2 className="text-base font-medium text-[#262626] mb-3">5&quot; or 7&quot; inseam?</h2>
          <p className="text-[#555555] leading-relaxed mb-3">
            Both lengths are popular right now and the right call depends on how you train and what you&apos;re comfortable with.
          </p>
          <ul className="space-y-2 text-sm text-[#555555]">
            <li className="flex items-start gap-3">
              <span className="font-medium text-[#262626] flex-none">5&quot;</span>
              The current gym aesthetic standard. Sits above the knee, shows more leg. Works best with a liner underneath — without one, it&apos;s a short that requires confidence.
            </li>
            <li className="flex items-start gap-3">
              <span className="font-medium text-[#262626] flex-none">7&quot;</span>
              The safer all-rounder. More coverage, works linerless, transitions better to casual wear. Still a clean gym look when worn high on the waist.
            </li>
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
                  {pick.slug !== "crz-yoga" && (
                    <Link
                      href={`/brands/${pick.slug}`}
                      className="text-sm font-medium text-[#262626] hover:text-[#6D6C6C] transition-colors"
                    >
                      View {pick.name.split(" ")[0]} →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Care tip */}
        <div className="mt-12 rounded-2xl border border-[#F2F2F2] bg-white p-6 sm:p-8">
          <h2 className="text-base font-medium text-[#262626] mb-2">How to make them last</h2>
          <p className="text-[#555555] text-sm leading-relaxed">
            The single biggest factor in how long a premium short lasts is how you wash it. Cold water on a delicate cycle, then air dry — not the tumble dryer. It feels like extra effort, but it extends the life of the liner, the waistband elasticity, and the shell fabric significantly. Most of the durability complaints about these shorts come from people who machine wash and tumble dry on full heat.
          </p>
        </div>

        {/* How to choose */}
        <div className="mt-6 rounded-2xl bg-[#F9F9F9] p-6 sm:p-8">
          <h2 className="text-xl font-medium text-[#262626] mb-3">How to choose</h2>
          <div className="space-y-3 text-[#555555] leading-relaxed">
            <p>
              <strong className="text-[#262626]">Primarily lifting or CrossFit?</strong> Ten Thousand Interval. If you want something that also looks good outside the gym, Lululemon License to Train runs it close.
            </p>
            <p>
              <strong className="text-[#262626]">Running?</strong> Lululemon Pace Breaker for outdoor summer running. Ten Thousand Interval if you carry your phone and want a more secure pocket.
            </p>
            <p>
              <strong className="text-[#262626]">Want one short for everything?</strong> Rhone Mako. It handles training, errands, and casual wear without looking out of place in any of them.
            </p>
            <p>
              <strong className="text-[#262626]">Budget conscious?</strong> Gymshark Arrival at £26 is genuinely good. CRZ Yoga if you want Lululemon-level fabric feel at a fraction of the price.
            </p>
            <p>
              <strong className="text-[#262626]">Already have a solid rotation and want to upgrade?</strong> ASRV Tetra-Lite. The most technically impressive short on this list.
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
