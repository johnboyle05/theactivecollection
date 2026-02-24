"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Brand } from "@/lib/brand-types";
import { HomeFeed } from "./home-feed";

const STORAGE_KEY = "active-collection:favourites";

function HeartIcon({ filled = false }: { filled?: boolean }) {
  if (filled) {
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
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="h-5 w-5 text-[#e63946]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M12.1 20.3c-.2.1-.4.1-.6 0C7.1 17 3.5 13.9 2 10.6c-1.9-4.1.9-8.6 5.3-8.6 2 0 3.8 1 4.7 2.6C13 3 14.8 2 16.8 2 21.2 2 24 6.5 22 10.6c-1.5 3.3-5.1 6.4-9.9 9.7z" />
    </svg>
  );
}

function FavouritesList({
  brands,
  onClose,
  onToggleFavourite,
  showCloseButton = true,
}: {
  brands: Brand[];
  onClose: () => void;
  onToggleFavourite: (brandId: string) => void;
  showCloseButton?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      {brands.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-4 my-1 text-sm text-[#949292]">
          No favourites yet. Tap a heart on any brand to save it here.
        </div>
      ) : (
        <ul className="divide-y divide-zinc-100">
          {brands.map((brand) => {
            const price = brand.columns["Price"] ?? brand.columns["Price Point"] ?? "";
            const shipping = brand.columns["Ships To"] ?? brand.columns["Shipping"] ?? "";
            return (
              <li key={brand.id} className="flex items-center gap-3 py-3">
                <div className="h-14 w-14 flex-none overflow-hidden rounded-xl bg-zinc-100">
                  <img
                    src={`/${brand.assets.background ?? "brand-assets/images/placeholder.png"}`}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = "/brand-assets/images/placeholder.png";
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#2d2d2d]">{brand.name}</p>
                  <p className="truncate text-xs text-[#6f6f6f]">Price: {price || "TBD"}</p>
                  <p className="truncate text-xs text-[#6f6f6f]">Shipping: {shipping || "TBD"}</p>
                </div>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-[#e63946] shadow-sm transition hover:border-zinc-300"
                  aria-label={`Remove ${brand.name} from favourites`}
                  onClick={() => onToggleFavourite(brand.id)}
                >
                  <HeartIcon filled />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {showCloseButton ? (
        <button
          type="button"
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-[#2d2d2d] transition hover:border-zinc-300"
          onClick={onClose}
        >
          Close
        </button>
      ) : null}
    </div>
  );
}

export function HomeShell({ brands }: { brands: Brand[] }) {
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavouriteIds(parsed);
        }
      }
    } catch (error) {
      console.warn("Failed to read favourites from storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favouriteIds));
    } catch (error) {
      console.warn("Failed to write favourites to storage", error);
    }
  }, [favouriteIds]);

  useEffect(() => {
    if (!isFavouritesOpen && !isMobileMenuOpen) return;
    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const clickedFaves =
        popoverRef.current?.contains(target) || buttonRef.current?.contains(target);
      const clickedMenu = mobileMenuRef.current?.contains(target);
      if (!clickedFaves && isFavouritesOpen) {
        setIsFavouritesOpen(false);
      }
      if (!clickedMenu && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [isFavouritesOpen, isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  const toggleFavourite = (brandId: string) => {
    setFavouriteIds((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId],
    );
  };

  const favouriteBrands = useMemo(
    () => brands.filter((brand) => favouriteIds.includes(brand.id)),
    [brands, favouriteIds],
  );

  const favouriteCount = favouriteIds.length;

  const clearFavourites = () => setFavouriteIds([]);

  useEffect(() => {
    setIsPopping(true);
    const timeout = setTimeout(() => setIsPopping(false), 320);
    return () => clearTimeout(timeout);
  }, [favouriteCount]);

  return (
    <div className="min-h-screen bg-[#fbfbfb] font-sans text-zinc-900">
      <nav className="sticky top-0 z-30 border-b border-[#f2f2f2] bg-[#fbfbfb]/90 backdrop-blur">
        <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
          {/* Mobile left logo */ }
          <div className="flex items-center gap-3 sm:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold uppercase text-white">
              AC
            </div>
          </div>

          {/* Desktop brand lockup */ }
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold uppercase text-white">
              AC
            </div>
            <span className="text-sm font-semibold tracking-tight text-zinc-800">
              Active Collection
            </span>
          </div>

          {/* Desktop links + favourites */ }
          <div className="hidden items-center gap-6 text-sm font-medium text-zinc-700 sm:flex">
            <a className="hover:text-zinc-900" href="#brands">
              Brands
            </a>
            <a className="hover:text-zinc-900" href="#filters">
              Filters
            </a>
            <a className="hover:text-zinc-900" href="#about">
              About
            </a>
            <button
              ref={buttonRef}
              type="button"
              className={`group relative inline-flex items-center gap-1 rounded-full border border-[#ededed] bg-white px-3 py-2 text-sm font-semibold text-[#6D6C6C] transition hover:border-zinc-300 hover:text-zinc-900 ${isPopping ? "favourites-pop" : ""}`}
              onClick={() => setIsFavouritesOpen((open) => !open)}
              aria-expanded={isFavouritesOpen}
              aria-controls="favourites-panel"
            >
              <HeartIcon filled={favouriteCount > 0} />
              <span className="rounded-full bg-[#f8f8f8] px-2 py-0.5 text-xs text-[#4d4d4d]">
                {favouriteCount}
              </span>
            </button>
          </div>

          {/* Mobile favourites + hamburger */ }
          <div className="flex items-center gap-3 sm:hidden">
            <button
              ref={buttonRef}
              type="button"
              className={`group inline-flex items-center gap-1 rounded-full border border-[#ededed] bg-white px-3 py-2 text-sm font-semibold text-[#6D6C6C] transition hover:border-zinc-300 hover:text-zinc-900 ${isPopping ? "favourites-pop" : ""}`}
              onClick={() => {
                setIsFavouritesOpen((open) => !open);
                setIsMobileMenuOpen(false);
              }}
              aria-expanded={isFavouritesOpen}
              aria-controls="favourites-panel"
            >
              <HeartIcon filled={favouriteCount > 0} />
              <span className="rounded-full bg-[#f8f8f8] px-2 py-0.5 text-xs text-[#4d4d4d]">
                {favouriteCount}
              </span>
            </button>
            <button
              type="button"
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#ededed] bg-white text-xl text-[#383232] shadow-sm transition hover:border-zinc-300 hover:text-zinc-900"
              onClick={() => {
                setIsMobileMenuOpen((open) => !open);
                setIsFavouritesOpen(false);
              }}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>

          {/* Desktop favourites popover */ }
          {isFavouritesOpen ? (
            <div
              id="favourites-panel"
              ref={popoverRef}
              className="absolute right-0 top-[calc(100%+12px)] hidden w-96 max-w-[90vw] rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl sm:block"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-base font-semibold text-[#262626]">Favourites</p>
                  {favouriteCount > 0 ? (
                    <span className="text-xs text-[#8f8f8f]">{favouriteCount} brand(s)</span>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-label="Close favourites"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-lg text-[#7a7a7a] transition hover:border-zinc-300 hover:text-[#2d2d2d]"
                  onClick={() => setIsFavouritesOpen(false)}
                >
                  ×
                </button>
              </div>
              <FavouritesList
                brands={favouriteBrands}
                onClose={() => setIsFavouritesOpen(false)}
                onToggleFavourite={toggleFavourite}
                showCloseButton={false}
              />
              {favouriteCount > 0 ? (
                <button
                  type="button"
                  className="mt-3 inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-[#2d2d2d] transition hover:border-zinc-300"
                  onClick={() => {
                    clearFavourites();
                    setIsFavouritesOpen(false);
                  }}
                >
                  Clear all favourites
                </button>
              ) : null}
            </div>
          ) : null}

          {/* Mobile menu dropdown */ }
          {isMobileMenuOpen ? (
            <div
              ref={mobileMenuRef}
              className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl sm:hidden"
            >
              <div className="flex flex-col gap-2 text-base font-medium text-[#3a3a3a]">
                <a className="rounded-lg px-2 py-2 hover:bg-zinc-50" href="#brands">
                  Brands
                </a>
                <a className="rounded-lg px-2 py-2 hover:bg-zinc-50" href="#filters">
                  Filters
                </a>
                <a className="rounded-lg px-2 py-2 hover:bg-zinc-50" href="#about">
                  About
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </nav>

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

      {isFavouritesOpen ? (
        <div
          className="fixed inset-0 z-30 flex items-end pb-0 pt-16 sm:hidden"
          onClick={() => setIsFavouritesOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative z-10 flex w-full flex-col rounded-t-[28px] border border-t border-zinc-200 bg-white p-5 shadow-[0_-20px_60px_rgba(0,0,0,0.12)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xl font-semibold text-[#262626]">Favourites</p>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f6f6] text-2xl font-semibold text-[#9D9D9D]"
                aria-label="Close favourites"
                onClick={() => setIsFavouritesOpen(false)}
              >
                ×
              </button>
            </div>
            <FavouritesList
              brands={favouriteBrands}
              onClose={() => setIsFavouritesOpen(false)}
              onToggleFavourite={toggleFavourite}
            />
          </div>
        </div>
      ) : null}

      <main className="content mx-auto flex w-full max-w-6xl flex-col gap-10 py-12 sm:px-8">
        <section id="filters">
          <HomeFeed
            brands={brands}
            favouriteIds={favouriteIds}
            onToggleFavourite={toggleFavourite}
          />
        </section>
      </main>

      <style jsx global>{`
        @keyframes favourites-pop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1);
          }
        }
        .favourites-pop {
          animation: favourites-pop 0.3s ease;
        }
      `}</style>
    </div>
  );
}
