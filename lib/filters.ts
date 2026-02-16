import type { Brand } from "./brand-types";

export type FilterId = "regions" | "shipping" | "activity" | "gender" | "price" | "values";

export type FilterCategory = {
  id: FilterId;
  label: string;
  columnKeys: string[];
};

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterOptionsMap = Record<FilterId, FilterOption[]>;
export type SelectedFilters = Record<FilterId, string[]>;

export const FILTER_CATEGORIES: FilterCategory[] = [
  {
    id: "regions",
    label: "Region",
    columnKeys: ["Region", "Regions", "Location", "Country"],
  },
  {
    id: "shipping",
    label: "Shipping",
    columnKeys: ["Shipping", "Ships To", "Shipping Regions"],
  },
  {
    id: "activity",
    label: "Activity",
    columnKeys: ["Activity", "Activities", "Made For"],
  },
  {
    id: "gender",
    label: "Gender",
    columnKeys: ["Gender", "Genders"],
  },
  {
    id: "price",
    label: "Price",
    columnKeys: ["Price", "Price Point"],
  },
  {
    id: "values",
    label: "Values",
    columnKeys: ["Values", "Value Props", "Value Proposition"],
  },
];

const CATEGORY_MAP: Record<FilterId, FilterCategory> = FILTER_CATEGORIES.reduce(
  (acc, category) => {
    acc[category.id] = category;
    return acc;
  },
  {} as Record<FilterId, FilterCategory>,
);

export function createEmptySelection(): SelectedFilters {
  return FILTER_CATEGORIES.reduce(
    (acc, category) => {
      acc[category.id] = [];
      return acc;
    },
    {} as SelectedFilters,
  );
}

export function buildFilterOptions(brands: Brand[]): FilterOptionsMap {
  const optionMaps = FILTER_CATEGORIES.reduce(
    (acc, category) => {
      acc[category.id] = new Map<string, string>();
      return acc;
    },
    {} as Record<FilterId, Map<string, string>>,
  );

  brands.forEach((brand) => {
    FILTER_CATEGORIES.forEach((category) => {
      const tokens = getBrandTokens(brand, category);
      tokens.forEach((token) => {
        optionMaps[category.id].set(token.value, token.label);
      });
    });
  });

  const options = {} as FilterOptionsMap;
  FILTER_CATEGORIES.forEach((category) => {
    const entries = Array.from(optionMaps[category.id].entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
    options[category.id] = entries;
  });

  return options;
}

export function brandMatchesSelected(brand: Brand, selected: SelectedFilters) {
  return FILTER_CATEGORIES.every((category) => {
    const values = selected[category.id];
    if (!values || values.length === 0) {
      return true;
    }
    const brandTokens = getBrandTokens(brand, category).map((token) => token.value);
    return values.some((value) => brandTokens.includes(value));
  });
}

export function getBrandTokens(
  brand: Brand,
  categoryOrId: FilterCategory | FilterId,
): FilterOption[] {
  const category =
    typeof categoryOrId === "string" ? CATEGORY_MAP[categoryOrId] : categoryOrId;

  const optionMap = new Map<string, string>();
  category.columnKeys.forEach((columnKey) => {
    const rawValue = getColumnValue(brand, columnKey);
    if (!rawValue) {
      return;
    }
    splitCell(rawValue).forEach((token) => {
      const normalized = normalizeToken(token);
      if (!normalized) {
        return;
      }
      optionMap.set(normalized, prettifyLabel(token));
    });
  });

  return Array.from(optionMap.entries()).map(([value, label]) => ({ value, label }));
}

function getColumnValue(brand: Brand, columnKey: string) {
  if (brand.columns[columnKey]) {
    return brand.columns[columnKey];
  }
  const lowerKey = columnKey.toLowerCase();
  const match = Object.entries(brand.columns).find(
    ([key]) => key.toLowerCase() === lowerKey,
  );
  return match?.[1] ?? "";
}

function splitCell(value: string) {
  return value
    .split(/[\n,/|;&]+/g)
    .map((token) => token.replace(/^[\s-]+/, "").replace(/[\s-]+$/, ""))
    .map((token) => token.trim())
    .filter(Boolean);
}

function normalizeToken(token: string) {
  return token.trim().toLowerCase().replace(/\s+/g, " ");
}

function prettifyLabel(token: string) {
  const trimmed = token.trim().replace(/\s+/g, " ");
  if (!trimmed) {
    return "";
  }
  if (trimmed === trimmed.toUpperCase()) {
    return capitalize(trimmed.toLowerCase());
  }
  return trimmed;
}

function capitalize(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}
