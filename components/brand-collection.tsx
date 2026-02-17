"use client";

import type { Brand } from "@/lib/brand-types";

import { BrandCard } from "./brand-card";
import Link from "next/link";

type BrandCollectionProps = {
  title: string;
  description?: string;
  brands: Brand[];
  emptyMessage?: string;
};

export function BrandCollection({
  title,
  description,
  brands,
  emptyMessage = "No brands match these filters yet.",
}: BrandCollectionProps) {
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
              <Link href={`/brands/${brand.slug}`} className="block h-full">
                <BrandCard brand={brand} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
