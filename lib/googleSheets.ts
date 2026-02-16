import "server-only";

export type SheetRecord = Record<string, string>;

type FetchSheetArgs = {
  /**
   * Next.js ISR revalidation window in seconds.
   */
  revalidate?: number;
};

const DEFAULT_REVALIDATE = 300;

export async function fetchSheetRecords({
  revalidate = DEFAULT_REVALIDATE,
}: FetchSheetArgs = {}): Promise<SheetRecord[]> {
  const publishedUrl = getRequiredEnv("GOOGLE_SHEETS_PUBLISHED_URL");
  const csvUrl = buildCsvUrl(publishedUrl);

  const response = await fetch(csvUrl, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`Google Sheets publish error: ${response.statusText}`);
  }

  const csvText = await response.text();
  const rows = parseCsv(csvText);

  const headerIndex = rows.findIndex((row) =>
    row.some((cell) => sanitize(cell).length > 0),
  );
  if (headerIndex === -1) {
    return [];
  }

  const headerRow = rows[headerIndex];
  const dataRows = rows.slice(headerIndex + 1);
  const normalizedHeaders = headerRow.map((header) => sanitize(header));

  return dataRows
    .filter((row) => row.some((cell) => (cell ?? "").trim().length > 0))
    .map((row) => {
      const record: SheetRecord = {};
      normalizedHeaders.forEach((header, index) => {
        if (!header) {
          return;
        }
        record[header] = sanitize(row[index] ?? "");
      });
      return record;
    });
}

function buildCsvUrl(rawUrl: string) {
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

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
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

function sanitize(value: string | undefined) {
  if (!value) {
    return "";
  }
  return value.replace(/^\ufeff/, "").trim();
}

function getRequiredEnv(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
