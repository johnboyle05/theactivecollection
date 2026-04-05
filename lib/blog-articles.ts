export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  gradient: string;
  featured: boolean;
  imageUrl?: string;
};

export const ARTICLES: Article[] = [
  // ── Featured (5) ──────────────────────────────────────────────────────────
  {
    slug: "gymshark-vs-alphalete",
    category: "Comparison",
    title: "Gymshark vs Alphalete — Which Is Actually Worth Your Money?",
    excerpt: "Both brands have built massive communities off the back of gym culture. When it comes to the actual product, which one delivers?",
    date: "Apr 2025",
    readTime: "6 min read",
    gradient: "from-zinc-700 to-zinc-900",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1668260948546-e5ba33085688?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slug: "best-mens-activewear-brands",
    category: "Roundup",
    title: "The Best Men's Activewear Brands Right Now",
    excerpt: "No filler. Just the brands consistently delivering on performance and style.",
    date: "Apr 2025",
    readTime: "8 min read",
    gradient: "from-stone-600 to-stone-800",
    featured: true,
  },
  {
    slug: "lululemon-review",
    category: "Brand Review",
    title: "Is Lululemon Actually Worth It in 2025?",
    excerpt: "After years of wearing it, here's our honest take on whether it's worth the premium.",
    date: "Apr 2025",
    readTime: "5 min read",
    gradient: "from-slate-600 to-slate-800",
    featured: true,
  },
  {
    slug: "#",
    category: "Comparison",
    title: "Can You Actually Do the Splits in Jeans?",
    excerpt: "We test the most flexible denim brands so you don't have to.",
    date: "Apr 2025",
    readTime: "4 min read",
    gradient: "from-neutral-700 to-neutral-900",
    featured: true,
  },
  {
    slug: "#",
    category: "Roundup",
    title: "The Best Leggings of 2026",
    excerpt: "Every pair tested. Only the best make the cut.",
    date: "Apr 2025",
    readTime: "7 min read",
    gradient: "from-zinc-500 to-zinc-700",
    featured: true,
  },
  // ── All articles (additional) ─────────────────────────────────────────────
  {
    slug: "#",
    category: "Brand Review",
    title: "Vuori Review — The Activewear You Forget You're Wearing",
    excerpt: "Vuori has built its reputation on versatility. But does it hold up to scrutiny?",
    date: "Apr 2025",
    readTime: "5 min read",
    gradient: "from-stone-500 to-stone-700",
    featured: false,
  },
  {
    slug: "#",
    category: "Roundup",
    title: "Best Sustainable Activewear Brands",
    excerpt: "Brands putting the real work in on sustainability — without compromising on product.",
    date: "Apr 2025",
    readTime: "6 min read",
    gradient: "from-zinc-600 to-zinc-800",
    featured: false,
  },
  {
    slug: "#",
    category: "Comparison",
    title: "Lululemon vs Vuori — The Versatility Battle",
    excerpt: "Two brands built around versatility. Which one actually nails it?",
    date: "Apr 2025",
    readTime: "5 min read",
    gradient: "from-neutral-600 to-neutral-800",
    featured: false,
  },
  {
    slug: "#",
    category: "Brand Review",
    title: "ASRV Review — Space-Age Materials, Real-World Performance",
    excerpt: "NASA thermoregulation in your gym kit. We find out if it's worth the premium.",
    date: "Apr 2025",
    readTime: "6 min read",
    gradient: "from-slate-700 to-slate-900",
    featured: false,
  },
  {
    slug: "#",
    category: "Roundup",
    title: "Best Men's Training Shorts Right Now",
    excerpt: "From heavy lifting to running — the shorts that hold up in every session.",
    date: "Apr 2025",
    readTime: "7 min read",
    gradient: "from-stone-700 to-stone-900",
    featured: false,
  },
  {
    slug: "#",
    category: "Comparison",
    title: "Rhone vs Ten Thousand — Premium Men's Training Wear",
    excerpt: "Two of the best men's training brands go head to head. Which is worth your money?",
    date: "Apr 2025",
    readTime: "6 min read",
    gradient: "from-zinc-400 to-zinc-600",
    featured: false,
  },
  {
    slug: "best-mens-training-pants",
    category: "Roundup",
    title: "The Best Men's Training Pants Right Now",
    excerpt: "Fit, fabric, and versatility. Seven picks across every price point — from budget entry to technically ambitious.",
    date: "Apr 2025",
    readTime: "7 min read",
    gradient: "from-stone-700 to-zinc-900",
    featured: false,
  },
  {
    slug: "best-mens-workout-shorts",
    category: "Roundup",
    title: "The Best Men's Workout Shorts Right Now",
    excerpt: "From CrossFit to casual Saturdays — the shorts that hold up when your training does.",
    date: "Apr 2025",
    readTime: "7 min read",
    gradient: "from-zinc-600 to-stone-800",
    featured: false,
  },
];
