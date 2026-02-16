#!/usr/bin/env node
/**
 * Generates placeholder icons and images for every brand found in the Google Sheet.
 * Uses the published CSV URL defined in .env.local (or process.env).
 */

const fs = require("fs");
const path = require("path");

const ENV_PATH = path.join(process.cwd(), ".env.local");
const ICON_DIR = path.join(process.cwd(), "public/brand-assets/icons");
const IMAGE_DIR = path.join(process.cwd(), "public/brand-assets/images");
const PLACEHOLDER_ICON = path.join(ICON_DIR, "placeholder.png");
const PLACEHOLDER_IMAGE = path.join(IMAGE_DIR, "placeholder.png");

async function main() {
  loadDotEnv();
  const sheetUrl = process.env.GOOGLE_SHEETS_PUBLISHED_URL;
  if (!sheetUrl) {
    throw new Error("Missing GOOGLE_SHEETS_PUBLISHED_URL (set it in .env.local).");
  }

  const csvUrl = buildCsvUrl(sheetUrl);
  const csv = await fetch(csvUrl).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to download sheet: ${res.status} ${res.statusText}`);
    }
    return res.text();
  });

  const rows = parseCsv(csv);
  const headerIndex = rows.findIndex((row) => row.some((cell) => sanitize(cell).length > 0));
  if (headerIndex === -1) {
    console.log("No header row found; nothing to do.");
    return;
  }
  const headers = rows[headerIndex].map((cell) => sanitize(cell));
  const dataRows = rows.slice(headerIndex + 1);

  const nameFields = ["Brand Name", "Brand", "Name"];
  const brands = dataRows
    .map((row) => {
      const record = {};
      headers.forEach((header, index) => {
        if (header) {
          record[header] = sanitize(row[index] ?? "");
        }
      });
      const name = pickFirst(record, nameFields);
      if (!name) return null;
      const slug = slugify(pickFirst(record, ["Slug", "slug", "ID", "Id"]) ?? name);
      return { name, slug };
    })
    .filter(Boolean);

  ensureDir(ICON_DIR);
  ensureDir(IMAGE_DIR);

  brands.forEach((brand) => {
    const iconPath = path.join(ICON_DIR, `${brand.slug}.png`);
    const imagePath = path.join(IMAGE_DIR, `${brand.slug}.png`);
    if (!fs.existsSync(iconPath)) {
      fs.copyFileSync(PLACEHOLDER_ICON, iconPath);
    }
    if (!fs.existsSync(imagePath)) {
      fs.copyFileSync(PLACEHOLDER_IMAGE, imagePath);
    }
  });

  console.log(
    `Generated placeholders for ${brands.length} brands in ${ICON_DIR} and ${IMAGE_DIR}.`,
  );
}

function loadDotEnv() {
  if (!fs.existsSync(ENV_PATH)) return;
  const lines = fs.readFileSync(ENV_PATH, "utf8").split("\n");
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const [key, ...rest] = trimmed.split("=");
    if (!key || rest.length === 0) return;
    const value = rest.join("=");
    if (!process.env[key]) {
      process.env[key] = value;
    }
  });
}

function buildCsvUrl(rawUrl) {
  const url = new URL(rawUrl);
  if (url.pathname.endsWith("/pubhtml")) {
    url.pathname = url.pathname.replace(/\/pubhtml$/, "/pub");
  }
  if (!url.pathname.endsWith("/pub")) {
    url.pathname = url.pathname.replace(/\/$/, "");
    url.pathname = `${url.pathname}/pub`;
  }
  if (!url.searchParams.has("output")) {
    url.searchParams.set("output", "csv");
  }
  return url.toString();
}

function parseCsv(csv) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];

    if (char === '"') {
      if (inQuotes && csv[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && csv[i + 1] === "\n") {
        i++;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  row.push(current);
  rows.push(row);

  return rows.filter((entry, index) => {
    const hasContent = entry.some((cell) => cell.trim().length > 0);
    return hasContent || index === 0;
  });
}

function sanitize(value) {
  if (!value) return "";
  return value.replace(/^\ufeff/, "").trim();
}

function pickFirst(record, fields) {
  for (const field of fields) {
    if (record[field] && record[field].trim()) {
      return record[field].trim();
    }
  }
  return null;
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "placeholder";
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function initials(value) {
  const parts = value.trim().split(/\s+/);
  const chars = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return chars.join("") || "B";
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
