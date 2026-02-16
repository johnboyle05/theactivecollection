import "server-only";

import { randomUUID } from "node:crypto";

import { fetchSheetRecords, type SheetRecord } from "./googleSheets";
import type { Brand } from "./brand-types";
const NAME_FIELDS = ["Brand Name", "Brand", "Name"];
const TAGLINE_FIELDS = ["Tagline", "Summary", "Description", "Tag Line"];
const SLUG_FIELDS = ["Slug", "slug", "ID", "Id"];

export async function getBrands() {
  const records = await fetchSheetRecords();

  return records
    .map((record) => normalizeBrand(record))
    .filter((brand): brand is Brand => Boolean(brand));
}

function normalizeBrand(record: SheetRecord): Brand | undefined {
  const name = pickFirst(record, NAME_FIELDS);
  if (!name) {
    return undefined;
  }

  const slugSource = pickFirst(record, SLUG_FIELDS) ?? name;
  const slug = slugify(slugSource);
  const tagline = pickFirst(record, TAGLINE_FIELDS);
  const id = pickFirst(record, ["ID", "Id"]) ?? slug;

  return {
    id,
    slug,
    name: name.trim(),
    tagline: tagline?.trim(),
    assets: {
      icon: `brand-assets/icons/${slug}.png`,
      background: `brand-assets/images/${slug}.png`,
    },
    columns: record,
  };
}

function pickFirst(record: SheetRecord, fieldCandidates: string[]) {
  for (const field of fieldCandidates) {
    const value = record[field];
    if (value && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
}

function slugify(value: string) {
  const normalized = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized) {
    return normalized;
  }
  return randomUUID();
}
