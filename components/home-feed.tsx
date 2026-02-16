"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type React from "react";

import type { Brand } from "@/lib/brand-types";
import {
  FILTER_CATEGORIES,
  buildFilterOptions,
  brandMatchesSelected,
  createEmptySelection,
  type FilterId,
  type SelectedFilters,
} from "@/lib/filters";

import { BrandCollection } from "./brand-collection";

type HomeFeedProps = {
  brands: Brand[];
};

export function HomeFeed({ brands }: HomeFeedProps) {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    createEmptySelection,
  );
  const [appliedFilters, setAppliedFilters] = useState<SelectedFilters>(
    createEmptySelection,
  );
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [openCategory, setOpenCategory] = useState<FilterId | null>(null);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<FilterId | null>(null);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDraggingSheet, setIsDraggingSheet] = useState(false);
  const [isClosingMobileSheet, setIsClosingMobileSheet] = useState(false);
  const [sheetMotionReady, setSheetMotionReady] = useState(false);
  const desktopFilterRefs = useRef<Partial<Record<FilterId, HTMLDivElement | null>>>({});
  const isInitialRender = useRef(true);

  const filterOptions = useMemo(() => buildFilterOptions(brands), [brands]);
  const filteredBrands = useMemo(
    () => brands.filter((brand) => brandMatchesSelected(brand, appliedFilters)),
    [brands, appliedFilters],
  );

  const appliedCount = useMemo(
    () => Object.values(selectedFilters).reduce((sum, values) => sum + values.length, 0),
    [selectedFilters],
  );

  const toggleOption = (categoryId: FilterId, value: string) => {
    setSelectedFilters((prev) => {
      const next = new Set(prev[categoryId]);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return {
        ...prev,
        [categoryId]: Array.from(next),
      };
    });
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      setAppliedFilters(selectedFilters);
      return;
    }
    setIsApplyingFilters(true);
    const timeout = setTimeout(() => {
      setAppliedFilters(selectedFilters);
      setIsApplyingFilters(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [selectedFilters]);

  const clearCategory = (categoryId: FilterId) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [categoryId]: [],
    }));
  };

  const clearAll = () => {
    setSelectedFilters(createEmptySelection());
    setOpenCategory(null);
    setOpenMobileCategory(null);
  };

  const openMobileSheet = (categoryId: FilterId) => {
    setIsClosingMobileSheet(false);
    setIsMobileSheetOpen(true);
    setOpenMobileCategory(categoryId);
    requestAnimationFrame(() => setSheetMotionReady(true));
  };

  const closeMobileSheet = () => {
    setIsClosingMobileSheet(true);
    setSheetMotionReady(false);
    setDragOffset(0);
    setTimeout(() => {
      setIsMobileSheetOpen(false);
      setIsClosingMobileSheet(false);
      setOpenMobileCategory(null);
    }, 180);
  };

  const handleSaveFilters = () => {
    closeMobileSheet();
  };

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.buttons !== 1) return;
    setDragStartY(event.clientY);
    setIsDraggingSheet(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingSheet || dragStartY === null) return;
    const delta = event.clientY - dragStartY;
    setDragOffset(Math.max(delta, 0));
  };

  const handleDragEnd = () => {
    if (dragOffset > 80) {
      closeMobileSheet();
    }
    setDragStartY(null);
    setDragOffset(0);
    setIsDraggingSheet(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!openCategory) return;
      const container = desktopFilterRefs.current[openCategory];
      if (container && event.target instanceof Node && !container.contains(event.target)) {
        setOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openCategory]);

  useEffect(() => {
    if (!isMobileSheetOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [isMobileSheetOpen]);

  useEffect(() => {
    if (!isMobileSheetOpen) return;
    const id = requestAnimationFrame(() => setSheetMotionReady(true));
    return () => cancelAnimationFrame(id);
  }, [isMobileSheetOpen]);

  return (
    <div className="flex flex-col">
      <div className="sticky -top-16 z-20 flex flex-col gap-4 bg-[#fbfbfb]/90 backdrop-blur pb-6 pt-6 pl-4 sm:pl-0">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[#383232] text-4xl">Brand Filters</p>
          </div>
          {appliedCount > 0 ? (
            <button
              type="button"
              className="hidden text-sm font-medium text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline sm:inline-flex"
              onClick={clearAll}
            >
              Clear all
            </button>
          ) : null}
        </div>
        <div className="no-scrollbar flex flex-nowrap items-center gap-3 overflow-x-auto pb-1 sm:hidden">
          {FILTER_CATEGORIES.map((category) => {
            const activeCount = selectedFilters[category.id]?.length ?? 0;
            const hasSelection = activeCount > 0;
            return (
              <button
                type="button"
                key={category.id}
                onClick={() => openMobileSheet(category.id)}
                className={`flex flex-shrink-0 items-center gap-1 rounded-full border px-4 py-2 text-md transition-colors ${
                  hasSelection
                    ? "border-zinc-900 bg-white"
                    : "border-[#E3E3E3] bg-[#fcfcfc] text-[#6A6262] hover:border-zinc-300"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        <div className="hidden flex-wrap gap-3 sm:flex">
          {FILTER_CATEGORIES.map((category) => {
            const isOpen = openCategory === category.id;
            const activeCount = selectedFilters[category.id]?.length ?? 0;
            const hasSelection = activeCount > 0;
            return (
              <div
                className="relative"
                key={category.id}
                ref={(node) => {
                  desktopFilterRefs.current[category.id] = node;
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenCategory(isOpen ? null : category.id)}
                  className={`flex items-center gap-1 rounded-full border px-4 py-2 text-md transition-colors ${
                    hasSelection
                      ? "border-zinc-900 bg-white"
                      : "border-[#E3E3E3] bg-[#fcfcfc] text-[#6A6262] hover:border-zinc-300"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">{category.label}</span>
                  {hasSelection ? (
                    <span className="flex items-center gap-2 pl-2">
                      <span className="text-[#E3E3E3]">|</span>
                      <span
                        role="button"
                        aria-label={`Clear ${category.label} filters`}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white transition"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearCategory(category.id);
                        }}
                      >
                        <TrashIcon />
                      </span>
                    </span>
                  ) : (
                    <ChevronIcon open={isOpen} />
                  )}
                </button>

                {isOpen ? (
                  <div className="absolute z-20 mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-5 text-sm shadow-2xl">
                    <div className="mb-2.5 flex items-center justify-between">
                      <p className="font-medium text-[#262626]">{category.label}</p>
                      {hasSelection ? (
                        <button
                          type="button"
                          className="text-xs text-zinc-500 underline-offset-2 hover:text-zinc-900 hover:underline p-2 rounded-md border border-[#f2f2f2]"
                          onClick={() => clearCategory(category.id)}
                        >
                          Clear
                        </button>
                      ) : null}
                    </div>
                    <div className="flex max-h-100 flex-col overflow-y-auto pr-1">
                      {filterOptions[category.id]?.length ? (
                        filterOptions[category.id].map((option) => {
                          const checked = selectedFilters[category.id]?.includes(option.value);
                          return (
                            <label
                              key={option.value}
                              className="flex items-center gap-2 border-b border-[#F2F2F2] py-2 text-sm text-zinc-700 last:border-b-0 last:pb-1"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                                checked={checked}
                                onChange={() => toggleOption(category.id, option.value)}
                              />
                              <span>{option.label}</span>
                            </label>
                          );
                        })
                      ) : (
                        <p className="text-xs text-zinc-500">No data yet for this category.</p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
          {appliedCount > 0 ? (
            <button
              type="button"
              className="self-center text-sm text-[#A9A9A9] ml-2 underline-offset-4 hover:text-zinc-500 underline cursor-pointer pl-4 border-l-solid border-t-0 border-r-0 border-b-0 border"
              onClick={clearAll}
            >
              Clear all
            </button>
          ) : null}
        </div>
      </div>

      {isMobileSheetOpen ? (
        <div
          className={`fixed inset-0 z-30 flex items-end pb-0 pt-16 sm:hidden transition-opacity duration-200 ${isClosingMobileSheet || !sheetMotionReady ? "bg-black/40 opacity-0" : "bg-black/40 opacity-100"}`}
          onClick={closeMobileSheet}
        >
          <div
            className="flex h-[90vh] w-full flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.12)] transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `translateY(${!sheetMotionReady || isClosingMobileSheet ? "100%" : "0%"}) translateY(${dragOffset}px)`,
              transition: isDraggingSheet ? "none" : "transform 200ms ease-out",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-4 border-b border-zinc-100 px-6 pb-4 pt-5">
              <div
                className="mx-auto flex h-9 w-16 items-center justify-center"
                role="button"
                aria-label="Drag to close filters"
                tabIndex={0}
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onPointerCancel={handleDragEnd}
              >
                <span className="h-1.5 w-full rounded-full bg-zinc-200" />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium text-[#262626]">Filters</p>
                <button
                  type="button"
                  className="bg-[#f9f9f9] flex h-10 w-10 items-center justify-center rounded-full text-xl font-semibold text-[#9D9D9D] transition hover:bg-zinc-100 hover:text-zinc-800 pb-1.5"
                  aria-label="Close filters"
                  onClick={closeMobileSheet}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {FILTER_CATEGORIES.map((category) => {
                const isOpen = openMobileCategory === category.id;
                const activeCount = selectedFilters[category.id]?.length ?? 0;
                const hasSelection = activeCount > 0;
                return (
                  <div key={category.id} className="border-b border-zinc-100 py-4">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3"
                      onClick={() => setOpenMobileCategory(isOpen ? null : category.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-2 text-left">
                        <span className="text-base font-medium text-[#383838]">
                          {category.label}
                        </span>
                        {hasSelection ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-medium text-zinc-700">
                            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-zinc-800">
                              {activeCount}
                            </span>
                            <button
                              type="button"
                              className="text-xs font-medium text-zinc-600 underline-offset-3 hover:text-zinc-900 pr-2 border border-zinc-300 border-t-0 border-r-0 border-b-0 pl-2"
                              onClick={(event) => {
                                event.stopPropagation();
                                clearCategory(category.id);
                              }}
                            >
                              Clear
                            </button>
                          </span>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-regular text-[#ABABAB]">
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                    </button>
                    {isOpen ? (
                      <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-700 mt-5">
                        {filterOptions[category.id]?.length ? (
                          filterOptions[category.id].map((option) => {
                            const checked = selectedFilters[category.id]?.includes(
                              option.value,
                            );
                            return (
                              <label
                                key={option.value}
                                className="flex items-center gap-3 border-b border-zinc-200 pb-3 text-[15px] text-zinc-800 last:border-b-0 last:pb-0"
                              >
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                                  checked={checked}
                                  onChange={() => toggleOption(category.id, option.value)}
                                />
                                <span>{option.label}</span>
                              </label>
                            );
                          })
                        ) : (
                          <p className="text-xs text-zinc-500">
                            No data yet for this category.
                          </p>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="sticky bottom-0 flex flex-col gap-3 border-t border-zinc-100 bg-white px-6 py-5">
              <button
                type="button"
                className="flex-1 rounded-xl px-5 py-3.5 text-base font-medium text-[#262626] transition border border-zinc-200"
                onClick={handleSaveFilters}
              >
                Save filters
              </button>
              <button
                type="button"
                className="flex-1 rounded-full underline px-5 py-3.5 text-base font-regular underline-offset-4 text-[#6D6C6C] transition hover:border-zinc-400 hover:text-zinc-900"
                onClick={clearAll}
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <BrandCollection
        title="Home feed"
        description={
          appliedCount === 0
            ? "Showing every brand from your sheet."
            : "Filtered based on the selections above."
        }
        brands={filteredBrands}
        emptyMessage="No brands match these filters yet. Try clearing a few selections."
      />
      {isApplyingFilters ? (
        <div className="pointer-events-none fixed inset-0 z-40 bg-white/40 transition-opacity duration-150 hidden sm:block" />
      ) : null}
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="h-3.5 w-3.5 text-zinc-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M5 6l1 14h12l1-14" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`h-5 w-5 text-current transition-transform duration-150 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      viewBox="0 0 20 20"
      fill="none"
      stroke="#6A6262"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 8l5 5 5-5" />
    </svg>
  );
}
