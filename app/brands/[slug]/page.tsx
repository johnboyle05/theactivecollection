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
  };
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const FIELD_MAP = {
  brand: ["Brand", "Brand Name", "Name"],
  slug: ["Slug", "slug", "ID", "Id"],
  region: ["Region"],
  shippingLocations: ["ShippingLocations", "Shipping Locations", "Ships To"],
  activities: ["Activities", "Activity"],
  genders: ["Genders", "Gender"],
  price: ["Price"],
  values: ["Values"],
  featured: ["Featured"],
  tagline: ["Tagline", "Summary", "Tag Line"],
  description: ["Description", "About"],
  website: ["Website", "Site"],
  instagram: ["Instagram", "Instagram URL"],
  yearFounded: ["YearFounded", "Year Founded", "Founded"],
  founder: ["Founder", "Founders"],
  countryOfManufacture: ["CountryOfManufacture", "Country of Manufacture", "Made In"],
  sizeRange: ["SizeRange", "Sizes"],
  materials: ["Materials"],
  galleryImages: ["GalleryImages", "Gallery"],
} as const;

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
  const recommended = buildRecommended(detail.galleryImages);
  const carouselImages =
    heroBannerImages.length > 0
      ? heroBannerImages
      : detail.galleryImages && detail.galleryImages.length > 0
        ? detail.galleryImages.slice(0, 3)
        : [heroImage].filter(Boolean);

  return (
    <div className="bg-white text-[#1f1f1f]">
      {carouselImages.length > 0 ? (
        <div className="mx-auto w-full max-w-6xl px-0 sm:px-5">
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

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-5 pb-16 pt-12 sm:px-8">
        <DescriptionSection detail={detail} />

        <AtAGlancePanel items={atAGlance} />

        <RecommendedProducts images={recommended} name={detail.brand} />

        <CuratorNote />
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
  };
}

function pickFirst(record: Record<string, string>, keys: readonly string[]) {
  for (const key of keys) {
    const val = record[key];
    if (val && val.trim()) return val.trim();
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
    ["Size Range", detail.sizeRange],
    ["Country of Manufacture", detail.countryOfManufacture],
  ].map(([label, value]) => {
    const safeLabel = label ?? "Data missing:Label";
    return {
      label: safeLabel,
      value: valueOrMissing(value, safeLabel),
    };
  });
}

function buildRecommended(images?: string[]) {
  if (!images || images.length === 0) {
    return [];
  }
  return images.slice(0, 3);
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
    <header className="relative mx-auto flex max-w-5xl flex-col gap-6 rounded-[18px] border border-[#e5e5e5] bg-[#f9f9f9] p-5 sm:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-[#1f1f1f] sm:text-4xl">{name}</h1>
        <p className="text-lg text-[#414141]">{tagline}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded border border-[#d7d7d7]/70 bg-white px-3 py-2">
        {website ? (
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-[#d7d7d7] px-3 py-2 text-sm font-medium text-[#1f1f1f] hover:bg-[#f3f3f3]"
          >
            Website link
          </a>
        ) : (
          <span className="text-sm text-[#1f1f1f]">{`Data missing:Website`}</span>
        )}
        {instagram ? (
          <a
            href={instagram}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-[#d7d7d7] px-3 py-2 text-sm font-medium text-[#1f1f1f] hover:bg-[#f3f3f3]"
          >
            Instagram link
          </a>
        ) : null}
      </div>
    </header>
  );
}

function DescriptionSection({ detail }: { detail: BrandDetail["detail"] }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold text-[#1f1f1f]">Blurb/Company description</h2>
      <p className="text-base leading-relaxed text-[#3b3b3b]">
        {valueOrMissing(detail.description, "Description")}
      </p>
    </section>
  );
}

function AtAGlancePanel({ items }: { items: { label: string; value: string }[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#1f1f1f]">At a glance</h2>
      <div className="rounded-2xl border border-[#dcdcdc] bg-white p-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <dt className="text-sm text-[#5a5a5a]">{item.label}</dt>
              <dd className="text-base font-medium text-[#1f1f1f]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function RecommendedProducts({ images, name }: { images: string[]; name: string }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-[#1f1f1f]">Recommended products</h2>
      <div className="flex flex-wrap gap-4">
        {images.length === 0
          ? [0, 1, 2].map((idx) => (
              <div
                key={idx}
                className="h-28 w-28 rounded-[10px] border border-[#e2e2e2] bg-[#f7f7f7]"
              />
            ))
          : images.map((src, idx) => (
              <div
                key={src + idx}
                className="relative h-28 w-28 overflow-hidden rounded-[10px] border border-[#e2e2e2] bg-[#f7f7f7]"
              >
                <Image
                  src={src}
                  alt={`${name} product ${idx + 1}`}
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>
            ))}
      </div>
    </section>
  );
}

function CuratorNote() {
  return (
    <section className="rounded-2xl border border-[#dcdcdc] bg-white px-6 py-8 sm:px-10 sm:py-12">
      <h2 className="text-2xl font-semibold text-[#1f1f1f]">Why we love them</h2>
      <p className="mt-3 max-w-3xl text-base text-[#3b3b3b]">
        Thoughtful design, considered materials, and a commitment to movement-first comfort make
        this brand stand out in our activewear lineup.
      </p>
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
