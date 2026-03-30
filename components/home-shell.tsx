"use client";

import { Suspense } from "react";
import type { Brand } from "@/lib/brand-types";
import { HomeFeed } from "./home-feed";
import { useFavourites } from "./favourites-provider";

export function HomeShell({ brands }: { brands: Brand[] }) {
  const { favouriteIds, toggleFavourite } = useFavourites();

  return (
    <div className="min-h-screen bg-[#fbfbfb] font-sans text-zinc-900">
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
          <Suspense>
            <HomeFeed
              brands={brands}
              favouriteIds={favouriteIds}
              onToggleFavourite={toggleFavourite}
            />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
