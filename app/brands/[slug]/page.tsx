import "server-only";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import fs from "node:fs";
import path from "node:path";

import type { Brand } from "@/lib/brand-types";
import { getBrands } from "@/lib/brands";
import { HeroCarousel } from "@/components/hero-carousel";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const brands = await getBrands();
  return brands.map((brand) => ({ slug: brand.slug }));
}

type BrandDetail = Brand & {
  detail: {
    brand: string;
    slug: string;
    region?: string;
    shippingLocations?: string;
    activities?: string;
    genders?: string;
    price?: string;
    values?: string;
    featured?: string;
    tagline?: string;
    description?: string;
    website?: string;
  instagram?: string;
  yearFounded?: string;
  founder?: string;
  countryOfManufacture?: string;
  sizeRange?: string;
  materials?: string;
  galleryImages?: string[];
  recommendedProducts?: RecommendedProduct[];
  whyWeLove?: string;
  };
};

type RecommendedProduct = {
  name: string;
  link?: string;
  imageUrl?: string;
  ref?: string;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const FIELD_MAP = {
  brand: ["Brand", "Brand Name", "Name"],
  slug: ["Slug", "slug", "ID", "Id"],
  region: ["Region"],
  shippingLocations: ["ShippingLocations", "Shipping Locations", "Ships To", "Shipping"],
  activities: ["Activities", "Activity"],
  genders: ["Genders", "Gender"],
  price: ["Price"],
  values: ["Values"],
  featured: ["Featured"],
  tagline: ["Tagline", "Summary", "Tag Line"],
  description: ["Description", "About"],
  whyWeLove: ["Why we love them", "WhyWeLove", "Why We Love"],
  website: ["Website", "Site"],
  instagram: ["Instagram", "Instagram URL"],
  yearFounded: ["YearFounded", "Year Founded", "Founded"],
  founder: ["Founder", "Founders"],
  countryOfManufacture: ["CountryOfManufacture", "Country of Manufacture", "Made In"],
  sizeRange: ["SizeRange", "Sizes"],
  materials: ["Materials"],
  galleryImages: ["GalleryImages", "Gallery"],
  recommendedProducts: ["RecommendedProducts", "Recommended Products"],
} as const;

const AT_A_GLANCE_ICONS: Record<string, { src: string; alt: string }> = {
  Region: { src: "/images/Region.svg", alt: "Region" },
  "Shipping Locations": { src: "/images/shipping.svg", alt: "Shipping" },
  Price: { src: "/images/pricing.svg", alt: "Pricing" },
  Activities: { src: "/images/Activity.svg", alt: "Activities" },
  Genders: { src: "/images/Genders.svg", alt: "Genders" },
  Values: { src: "/images/values.svg", alt: "Values" },
  "Country of Manufacture": { src: "/images/manufacturing.svg", alt: "Manufacturing country" },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) {
    return {};
  }
  const { detail } = brand;
  const titleBase = detail.brand || slug;
  const description = detail.tagline ?? detail.description ?? `Data missing:Description`;
  const image = detail.galleryImages?.[0];

  return {
    title: `${titleBase} | The Active Collection`,
    description,
    openGraph: {
      title: `${titleBase} | The Active Collection`,
      description,
      images: image
        ? [
            {
              url: image,
              alt: `${titleBase} hero image`,
            },
          ]
        : undefined,
    },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) {
    notFound();
  }

  const missingField = getFirstMissingRequired(brand.detail);
  if (missingField) {
    return <div className="p-6 text-lg">Data missing:{missingField}</div>;
  }

  const { detail } = brand;
  const heroBannerImages = findHeroBanners(detail.slug);
  const heroImage =
    heroBannerImages[0] ??
    (brand.assets.background ? `/${brand.assets.background}` : detail.galleryImages?.[0]);
  const atAGlance = buildMetaList(detail);
  const recommendedProducts =
    detail.recommendedProducts && detail.recommendedProducts.length > 0
      ? detail.recommendedProducts
      : buildRecommended(detail.galleryImages, detail.brand);
  const carouselImages =
    heroBannerImages.length > 0
      ? heroBannerImages
      : detail.galleryImages && detail.galleryImages.length > 0
        ? detail.galleryImages.slice(0, 3)
        : [heroImage].filter(Boolean);

  return (
    <div className="bg-white text-[#1f1f1f]">
      {carouselImages.length > 0 ? (
        <div className="mx-auto w-full px-0 sm:px-3 sm:pt-3">
          <HeroCarousel images={carouselImages} altBase={detail.brand} />
        </div>
      ) : null}

      <BrandHero
        name={detail.brand}
        tagline={detail.tagline ?? `Data missing:Tagline`}
        website={detail.website ?? ""}
        instagram={detail.instagram}
        image={heroImage}
      />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 pb-16 pt-1 sm:px-8">
        <DescriptionSection detail={detail} />

        <AtAGlancePanel items={atAGlance} />

        <RecommendedProducts products={recommendedProducts} name={detail.brand} />

        <CuratorNote copy={detail.whyWeLove} />
      </main>

      <JsonLd detail={detail} />
    </div>
  );
}

export function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-1/3 rounded bg-zinc-200" />
        <div className="h-5 w-2/3 rounded bg-zinc-200" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-48 rounded-2xl bg-zinc-100" />
          <div className="h-48 rounded-2xl bg-zinc-100" />
        </div>
      </div>
    </div>
  );
}

// Data helpers

async function getBrandBySlug(slug: string): Promise<BrandDetail | undefined> {
  const brands = await getBrands();
  const match = brands.find((b) => b.slug === slug);
  if (!match) return undefined;
  return { ...match, detail: mapDetail(match) };
}

function mapDetail(brand: Brand): BrandDetail["detail"] {
  const c = brand.columns;
  const get = (keys: readonly string[]) => pickFirst(c, keys);

  return {
    brand: get(FIELD_MAP.brand) ?? brand.name ?? `Data missing:Brand`,
    slug: brand.slug,
    region: get(FIELD_MAP.region),
    shippingLocations: get(FIELD_MAP.shippingLocations),
    activities: get(FIELD_MAP.activities),
    genders: get(FIELD_MAP.genders),
    price: get(FIELD_MAP.price),
  values: get(FIELD_MAP.values),
  featured: get(FIELD_MAP.featured),
  tagline: get(FIELD_MAP.tagline) ?? brand.tagline,
  description: get(FIELD_MAP.description),
  website: get(FIELD_MAP.website),
    instagram: get(FIELD_MAP.instagram),
    yearFounded: get(FIELD_MAP.yearFounded),
    founder: get(FIELD_MAP.founder),
    countryOfManufacture: get(FIELD_MAP.countryOfManufacture),
    sizeRange: get(FIELD_MAP.sizeRange),
    materials: get(FIELD_MAP.materials),
    galleryImages: parseGallery(get(FIELD_MAP.galleryImages)),
    recommendedProducts: parseRecommendedProducts(get(FIELD_MAP.recommendedProducts)),
    whyWeLove: get(FIELD_MAP.whyWeLove),
  };
}

function pickFirst(record: Record<string, string>, keys: readonly string[]) {
  const lowerKeyMap: Record<string, string> = {};
  for (const [k, v] of Object.entries(record)) {
    lowerKeyMap[k.toLowerCase()] = v;
  }

  for (const key of keys) {
    const direct = record[key];
    if (direct && direct.trim()) return direct.trim();
    const ci = lowerKeyMap[key.toLowerCase()];
    if (ci && ci.trim()) return ci.trim();
  }
  return undefined;
}

function parseGallery(raw?: string) {
  if (!raw) return undefined;
  return raw
    .split(/[,\\n]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseRecommendedProducts(raw?: string): RecommendedProduct[] {
  if (!raw) return [];
  return raw
    .split(/[;\n]+/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((chunk) => {
      const parts = chunk.includes("|")
        ? chunk.split("|")
        : chunk.split(",");
      const [name, link, imageUrl, ref] = parts.map((part) => part.trim());
      return {
        name: name ?? "",
        link: link || undefined,
        imageUrl: imageUrl || undefined,
        ref: ref || undefined,
      };
    })
    .filter((item) => item.name);
}

function getFirstMissingRequired(detail: BrandDetail["detail"]) {
  const required: (keyof BrandDetail["detail"])[] = ["brand", "slug"];
  return required.find((key) => !detail[key]);
}

function valueOrMissing(value: string | undefined, label: string) {
  return value && value.trim().length > 0 ? value : `Data missing:${label}`;
}

function buildMetaList(detail: BrandDetail["detail"]) {
  return [
    ["Region", detail.region],
    ["Shipping Locations", detail.shippingLocations],
    ["Price", detail.price],
    ["Activities", detail.activities],
    ["Genders", detail.genders],
    ["Values", detail.values],
    ["Country of Manufacture", detail.countryOfManufacture],
  ].map(([label, value]) => {
    const safeLabel = label ?? "Data missing:Label";
    const icon = AT_A_GLANCE_ICONS[safeLabel];
    return {
      label: safeLabel,
      value: valueOrMissing(value, safeLabel),
      iconSrc: icon?.src,
      iconAlt: icon?.alt,
    };
  });
}

function buildRecommended(images: string[] | undefined, brandName: string): RecommendedProduct[] {
  if (!images || images.length === 0) {
    return getDefaultRecommendedProducts(brandName);
  }
  return images.slice(0, 3).map((url, idx) => ({
    name: `${brandName} product ${idx + 1}`,
    imageUrl: url,
    link: undefined,
    ref: undefined,
  }));
}

function getDefaultRecommendedProducts(brandName: string): RecommendedProduct[] {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1528701800489-20be9e0f0bba?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521572160153-f5c1b001e2e9?auto=format&fit=crop&w=800&q=80",
  ];
  const fallbackLinks = [
    "https://example.com/product-1",
    "https://example.com/product-2",
    "https://example.com/product-3",
  ];
  return fallbackImages.map((imageUrl, idx) => ({
    name: `${brandName} pick ${idx + 1}`,
    imageUrl,
    link: fallbackLinks[idx],
    ref: `demo-${idx + 1}`,
  }));
}

function findHeroBanners(slug: string) {
  const baseDir = path.join(
    process.cwd(),
    "public",
    "brand-assets",
    "brand-page-level",
    "hero-banners",
    slug,
  );
  const candidates = ["hero-1", "hero-2", "hero-3"];
  const extensions = [".jpg", ".jpeg", ".png", ".webp"];
  const found: string[] = [];

  for (const name of candidates) {
    const match = extensions.find((ext) => fs.existsSync(path.join(baseDir, name + ext)));
    if (match) {
      found.push(`/brand-assets/brand-page-level/hero-banners/${slug}/${name}${match}`);
    }
  }

  return found;
}

// UI components

function BrandHero({
  name,
  tagline,
  website,
  instagram,
  image,
}: {
  name: string;
  tagline: string;
  website?: string;
  instagram?: string;
  image?: string;
}) {
  return (
    <header className="relative mx-auto flex max-w-5xl flex-col gap-3 p-5 sm:px-8">
      <div className="mt-4">
        <h1 className="text-3xl font-medium text-[#383232] sm:text-4xl">{name}</h1>
        <p className="text-lg text-[#414141]">{tagline}</p>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {website ? (
          <div className="flex items-center rounded-full bg-[#F9F9F9] px-3 py-1.5">
            <span className="web-icon flex h-6 w-6 items-center justify-center rounded-full bg-none text-[#1f1f1f]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3.5 9h17" />
                <path d="M3.5 15h17" />
                <path d="M12 3c2 3 2 15 0 18" />
              </svg>
            </span>
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="pr-3 pl-1 py-2 text-sm font-regular text-[#949292] inline-flex items-center gap-2"
            >
              {website}
              <span className="mini-arrow inline-flex h-4 w-4 items-center justify-center text-[#949292]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M7 5l5 5-5 5" />
                </svg>
              </span>
            </a>
          </div>
        ) : (
          <span className="text-sm text-[#1f1f1f]">{`Data missing:Website`}</span>
        )}
        {instagram ? (
          <div className="flex items-center rounded-full bg-[#F9F9F9] px-3 py-1.5">
            <span className="flex h-4 w-4 mr-1 items-center justify-centertext-[#1f1f1f]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <rect x="4" y="4" width="16" height="16" rx="4" ry="4" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="16.5" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <a
              href={formatInstagram(instagram)}
              target="_blank"
              rel="noreferrer"
              className="pr-3 pl-1 py-2 text-sm font-regular text-[#949292] inline-flex items-center gap-2"
            >
              {instagram}
              <span className="mini-arrow inline-flex h-4 w-4 items-center justify-center text-[#949292]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M7 5l5 5-5 5" />
                </svg>
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function DescriptionSection({ detail }: { detail: BrandDetail["detail"] }) {
  return (
    <section className="space-y-3">
      <p className="text-base leading-relaxed text-[#6A6262]">
        {valueOrMissing(detail.description, "Description")}
      </p>
    </section>
  );
}

function AtAGlancePanel({
  items,
}: {
  items: { label: string; value: string; iconSrc?: string; iconAlt?: string }[];
}) {
  return (
    <section className="space-y-4">
      <div className="rounded-2xl bg-[#F9F9F9] pt-1 sm:pt-2 pb-6 sm:pb-8 px-0 sm:px-2">
        <h2 className="text-xl font-medium text-[#262626] m-6 mb-2">At a glance</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl px-4 pt-3">
              {item.iconSrc ? (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#ededed] bg-[#ffffff]/30">
                  <Image
                    src={item.iconSrc}
                    alt={item.iconAlt ?? item.label}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              ) : null}
              <div className="flex flex-col justify-center">
                <dt className="text-sm text-[#777676]">{item.label}</dt>
                <dd className="text-base font-medium text-[#4C4C4C]">{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function RecommendedProducts({
  products,
  name,
}: {
  products: RecommendedProduct[];
  name: string;
}) {
  const productsToRender = products.length > 0 ? products : getDefaultRecommendedProducts(name);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-medium text-[#383232]">Recommended products</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
        {productsToRender.map((product, idx) => {
          const card = (
            <div className="flex w-60 flex-col gap-2 hover:opacity-90">
              <div className="relative h-60 w-60 overflow-hidden rounded-[10px] border border-[#e2e2e2] bg-[#f7f7f7]">
                <Image
                  src={product.imageUrl ?? "/brand-assets/images/placeholder.png"}
                  alt={product.name || `${name} product ${idx + 1}`}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>
              {product.name ? (
                <p className="truncate text-md font-regular text-[#949292]">{product.name}</p>
              ) : null}
            </div>
          );
          return product.link ? (
            <a
              key={(product.ref ?? product.name) + idx}
              href={product.link}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              {card}
            </a>
          ) : (
            <div key={(product.ref ?? product.name) + idx}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}

function CuratorNote({ copy }: { copy?: string }) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-[#dcdcdc] px-4 py-4 sm:px-8 sm:py-8"
      style={{
        backgroundImage: "url('/images/why-we-love-them.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/16 backdrop-blur-[1px]" aria-hidden="true" />
      <div className="relative px-4 py-6 sm:py-2">
        <h2 className="text-2xl font-medium text-white">Why we love them</h2>
        <p className="mt-1 max-w-3xl text-base text-[#f1f1f1]">
          {copy && copy.trim().length > 0
            ? copy
            : "Thoughtful design, considered materials, and a commitment to movement-first comfort make this brand stand out in our activewear lineup."}
        </p>
      </div>
    </section>
  );
}

function JsonLd({ detail }: { detail: BrandDetail["detail"] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: detail.brand,
    url: detail.website ?? undefined,
    description: detail.description ?? detail.tagline,
    sameAs: detail.instagram ? [detail.instagram] : undefined,
    brand: detail.brand,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function formatInstagram(handle: string) {
  if (!handle) return handle;
  if (handle.startsWith("http://") || handle.startsWith("https://")) {
    return handle;
  }
  const sanitized = handle.replace(/^@/, "");
  return `https://instagram.com/${sanitized}`;
}
