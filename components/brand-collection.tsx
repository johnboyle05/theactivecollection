"use client";

import type { Brand } from "@/lib/brand-types";
import { useRouter } from "next/navigation";

import { BrandCard } from "./brand-card";

type BrandCollectionProps = {
  title: string;
  description?: string;
  brands: Brand[];
  emptyMessage?: string;
  favouriteIds: string[];
  onToggleFavourite: (brandId: string) => void;
};

export function BrandCollection({
  title,
  description,
  brands,
  emptyMessage = "No brands match these filters yet.",
  favouriteIds,
  onToggleFavourite,
}: BrandCollectionProps) {
  const router = useRouter();

  const handleOpen = (slug: string) => {
    router.push(`/brands/${slug}`);
  };

  return (
    <section className="flex flex-col gap-4 px-4 sm:px-0">
 

      {brands.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm text-zinc-600">
          {emptyMessage}
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <li key={brand.id} className="h-full min-w-0">
              <div
                role="button"
                tabIndex={0}
                className="block h-full focus:outline-none"
                onClick={() => handleOpen(brand.slug)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleOpen(brand.slug);
                  }
                }}
              >
                <BrandCard
                  brand={brand}
                  isFavourite={favouriteIds.includes(brand.id)}
                  onToggleFavourite={onToggleFavourite}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
