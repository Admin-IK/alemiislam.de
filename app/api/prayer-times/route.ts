import { NextResponse } from "next/server";
import { getBerlinApiDateString } from "@/lib/prayerTimes/format";
import { parsePrayerResponse } from "@/lib/prayerTimes/parse";

export const dynamic = "force-dynamic";

/** Muss zum TLS-Zertifikat passen (Zertifikat ist für www.live.igmgapp.org ausgestellt). */
const DEFAULT_BASE = "https://www.live.igmgapp.org:8091";
const DEFAULT_CITY = "20133";

function truthyEnv(name: string, defaultTrue: boolean): boolean {
  const v = process.env[name]?.trim().toLowerCase();
  if (v === undefined || v === "") return defaultTrue;
  return v === "1" || v === "true" || v === "yes";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "tr" ? "tr" : "de";
  const from = searchParams.get("from") || getBerlinApiDateString();

  const base = (process.env.PRAYER_TIMES_API_BASE || DEFAULT_BASE).replace(
    /\/$/,
    "",
  );
  const city = process.env.PRAYER_CITY_ID || DEFAULT_CITY;
  const loc = locale === "tr" ? "tr" : "de";

  const u = new URL(`${base}/api/Calendar/GetPrayerTimes`);
  u.searchParams.set("cityID", city);
  u.searchParams.set("from", from);
  u.searchParams.set("locale", loc);

  const apiKey = process.env.PRAYER_TIMES_API_KEY?.trim();
  const useQuery = truthyEnv("PRAYER_TIMES_API_USE_QUERY", true);
  const useHeader = truthyEnv("PRAYER_TIMES_API_USE_HEADER", true);
  const useBearer = truthyEnv("PRAYER_TIMES_API_USE_BEARER", false);

  if (apiKey && useQuery) {
    const param =
      process.env.PRAYER_TIMES_API_QUERY_PARAM?.trim() || "apiKey";
    u.searchParams.set(param, apiKey);
  }

  const headers: Record<string, string> = { Accept: "application/json" };
  if (apiKey) {
    if (useBearer) {
      headers.Authorization = `Bearer ${apiKey}`;
    }
    if (useHeader) {
      const headerName =
        process.env.PRAYER_TIMES_API_HEADER?.trim() || "X-Api-Key";
      headers[headerName] = apiKey;
    }
  }

  try {
    const res = await fetch(u.toString(), {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "upstream",
          status: res.status,
          message: `API antwortete mit ${res.status}`,
        },
        { status: 502 },
      );
    }

    const json: unknown = await res.json();
    const parsed = parsePrayerResponse(json, from);

    if (!parsed) {
      return NextResponse.json(
        {
          ok: false,
          error: "parse",
          message: "Gebetszeiten konnten nicht gelesen werden.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      date: from,
      locale,
      ...parsed,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unbekannter Fehler";
    return NextResponse.json(
      {
        ok: false,
        error: "fetch",
        message,
      },
      { status: 502 },
    );
  }
}
