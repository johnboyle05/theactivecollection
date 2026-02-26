"use client";

import { useEffect, useState } from "react";
import type { Brand } from "@/lib/brand-types";
import { getBrandTokens } from "@/lib/filters";

type BrandCardProps = {
  brand: Brand;
  isFavourite?: boolean;
  onToggleFavourite?: (brandId: string) => void;
};

export function BrandCard({ brand, isFavourite = false, onToggleFavourite }: BrandCardProps) {
  const [isPopping, setIsPopping] = useState(false);
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

  useEffect(() => {
    if (!isFavourite) return;
    setIsPopping(true);
    const timeout = setTimeout(() => setIsPopping(false), 320);
    return () => clearTimeout(timeout);
  }, [isFavourite]);

  return (
    <article className="brand-card flex h-full flex-col rounded-3xl border border-[#F2F2F2] bg-white p-2 hover:opacity-90 cursor-pointer">
      <div className="card-top relative h-64 sm:h-72 overflow-hidden rounded-[18px] bg-gradient-to-br from-zinc-200 to-zinc-300">
        <img
          src={`/${assets.background ?? "brand-assets/images/placeholder.png"}`}
          alt={`${name} brand visual`}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = "/brand-assets/images/placeholder.png";
          }}
        />
        {onToggleFavourite ? (
          <button
            type="button"
            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            className={`pt-0.5 absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-[#e63946] backdrop-blur transition border ${
              isFavourite
                ? "bg-white border-white/80"
                : "bg-white/5 hover:bg-white/20 border-white/20"
            } ${isPopping ? "favourites-pop" : ""}`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onToggleFavourite(brand.id);
            }}
          >
            {isFavourite ? <FilledHeartIcon /> : <OutlineHeartIcon />}
          </button>
        ) : null}
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

function FilledHeartIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="h-5 w-5 fill-[#e63946] text-[#e63946]"
      viewBox="0 0 24 24"
    >
      <path d="M12 21s-7.5-4.35-10-9.2C-0.5 7.6 1.6 3 6 3c2.4 0 4 1.4 6 3.6C14 4.4 15.6 3 18 3c4.4 0 6.5 4.6 4 8.8C19.5 16.65 12 21 12 21z" />
    </svg>
  );
}

function OutlineHeartIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="h-5 w-5 text-[#e3e3e3]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M12.1 20.3c-.2.1-.4.1-.6 0C7.1 17 3.5 13.9 2 10.6c-1.9-4.1.9-8.6 5.3-8.6 2 0 3.8 1 4.7 2.6C13 3 14.8 2 16.8 2 21.2 2 24 6.5 22 10.6c-1.5 3.3-5.1 6.4-9.9 9.7z" />
    </svg>
  );
}
