import { NextResponse } from "next/server";

import { getBrands } from "@/lib/brands";
import { fetchSheetRecords } from "@/lib/googleSheets";

export async function GET() {
  try {
    const rawRecords = await fetchSheetRecords();
    const brands = await getBrands();
    return NextResponse.json({
      count: brands.length,
      sample: brands.slice(0, 3),
      headers: rawRecords[0] ? Object.keys(rawRecords[0]) : [],
      firstRow: rawRecords[0] ?? null,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error connecting to sheet";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
