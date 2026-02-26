"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type HeroCarouselProps = {
  images: string[];
  altBase: string;
};

export function HeroCarousel({ images, altBase }: HeroCarouselProps) {
  const slides = useMemo(
    () => images.filter(Boolean).slice(0, 3),
    [images],
  );
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1);

  useEffect(() => {
    setIndex(0);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const clampIndex = (value: number) =>
    (value + slides.length) % slides.length;

  const goTo = (next: number) => setIndex(clampIndex(next));
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setContainerWidth(e.currentTarget.clientWidth || 1);
    setTouchStartX(e.touches[0].clientX);
    setTouchDelta(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX == null) return;
    setTouchDelta(e.touches[0].clientX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta) > 50) {
      touchDelta < 0 ? next() : prev();
    }
    setTouchStartX(null);
    setTouchDelta(0);
  };

  return (
    <div className="relative overflow-hidden border border-[#e5e5e5] bg-[#f6f6f6] sm:rounded-[12px]">
      <div
        className="relative w-full touch-pan-y sm:h-[40vh]"
        style={{
          height: "65vh",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((src, i) => (
          <div
            key={src + i}
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${(i - index) * 100 + (i === index ? (touchDelta / containerWidth) * 100 : 0)}%)`,
            }}
          >
            <Image
              src={src}
              alt={`${altBase} hero image ${i + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === index ? "bg-white shadow" : "bg-white/60"
            }`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
