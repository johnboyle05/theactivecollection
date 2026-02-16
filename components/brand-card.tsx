"use client";

import type { Brand } from "@/lib/brand-types";
import { getBrandTokens } from "@/lib/filters";

type BrandCardProps = {
  brand: Brand;
};

export function BrandCard({ brand }: BrandCardProps) {
  const { name, tagline, assets, columns } = brand;
  const activityTokens = getBrandTokens(brand, "activity");
  const madeFor =
    activityTokens.length > 0
      ? activityTokens.map((token) => token.label).join(", ")
      : columns["Made For"] ?? columns["Activities"] ?? "";
  const priceValue = columns["Price"] ?? columns["Price Point"] ?? "";
  const priceLevel = getPriceLevel(priceValue);
  const shippingTag = {
    label: "Shipping",
    value: columns["Ships To"] ?? columns["Shipping"] ?? "",
  };

  return (
    <article className="brand-card flex h-full flex-col rounded-3xl border border-[#F2F2F2] bg-white p-2">
      <div className="card-top relative h-64 sm:h-72 overflow-hidden rounded-[18px] bg-gradient-to-br from-zinc-200 to-zinc-300">
        <img
          src={`/${assets.background ?? "brand-assets/images/placeholder.png"}`}
          alt={`${name} brand visual`}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = "/brand-assets/images/placeholder.png";
          }}
        />
      </div>
      <div className="card-bottom flex flex-col gap-2 rounded-b-3xl px-5 py-6">
        <div className="brand-name flex items-center gap-1">
          <div className="brand-icon h-4 w-4 mr-1">
            <img
              src={`/${assets.icon ?? "brand-assets/icons/placeholder.png"}`}
              alt={`${name} brand icon`}
              className="h-4 w-4 bg-white object-cover"
              onError={(event) => {
                event.currentTarget.src = "/brand-assets/icons/placeholder.png";
              }}
            />
          </div>
          <div className="brand-name text-xl font-medium text-[#262626]">
            {name}
          </div>
        </div>

        <p className="tagline text-md text-[#949292]">{tagline ?? "Tagline coming soon."}</p>

        <div className="tags flex flex-wrap gap-4 text-xs uppercase tracking-[0.1em] text-[#383838]">
          <div className="tag inline-flex items-center gap-2">
            <span className="tag-icon flex h-3 w-3 items-center justify-center">
              <img
                src="/brand-assets/icons/price-placeholder.png"
                alt=""
                className="h-5 w-5 object-contain"
              />
            </span>
            <span className="tag-data flex items-center gap-[2px] text-sm font-medium">
              {Array.from({ length: 6 }).map((_, index) => {
                const isActive = index < priceLevel;
                return (
                  <span
                    key={index}
                    className={isActive ? "text-[#383838]" : "text-[#CDCDCD]"}
                  >
                    $
                  </span>
                );
              })}
            </span>
          </div>

          {shippingTag.value ? (
            <div className="tag inline-flex items-center gap-2">
              <span className="tag-icon flex h-4 w-4 items-center justify-center">
                <img
                  src="/brand-assets/icons/shipping-placeholder.png"
                  alt=""
                  className="h-4 w-4 object-contain"
                />
              </span>
              <span className="tag-data text-[11px] font-medium text-zinc-700 truncate">
                {shippingTag.value}
              </span>
            </div>
          ) : null}
        </div>

        <div className="made-for bg-[#F9F9F9] flex items-center gap-2 rounded-lg p-4 mt-2">
          <div className="made-for-text flex items-center text-sm text-[#6D6C6C] font-medium flex-none">
            Made for:
          </div>
          <div className="made-for-list text-sm text-[#6D6C6C] truncate">
            {madeFor || "Activities coming soon."}
          </div>
        </div>

        {/* <dl className="text-xs text-zinc-500">
          <div className="flex items-center justify-between">
            <dt>Icon asset</dt>
            <dd className="font-mono text-zinc-700">{assets.icon}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt>Background</dt>
            <dd className="font-mono text-zinc-700">{assets.background}</dd>
          </div>
        </dl> */}
      </div>
    </article>
  );
}

function getPriceLevel(raw: string) {
  if (!raw) return 0;
  const dollarCount = (raw.match(/\$/g) ?? []).length;
  if (dollarCount > 0) {
    return Math.min(6, Math.max(1, dollarCount));
  }
  const numeric = Number(raw);
  if (!Number.isNaN(numeric) && numeric > 0) {
    return Math.min(6, Math.max(1, Math.round(numeric)));
  }
  return 0;
}
