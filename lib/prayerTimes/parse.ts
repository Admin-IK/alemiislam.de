export type PrayerSlot =
  | "imsak"
  | "gunes"
  | "ogle"
  | "ikindi"
  | "aksam"
  | "yatsi";

export type ParsedPrayerDay = {
  times: Record<PrayerSlot, string>;
  rawDate?: string;
};

const SLOTS: PrayerSlot[] = [
  "imsak",
  "gunes",
  "ogle",
  "ikindi",
  "aksam",
  "yatsi",
];

function normalizeTime(s: string): string {
  const t = s.trim().replace(/\./g, ":");
  const m = t.match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (!m) return t;
  return `${m[1].padStart(2, "0")}:${m[2]}`;
}

function pickFromObject(o: Record<string, unknown>): Partial<Record<PrayerSlot, string>> {
  const out: Partial<Record<PrayerSlot, string>> = {};
  const tryKeys = (slot: PrayerSlot, ...names: string[]) => {
    for (const name of names) {
      for (const key of Object.keys(o)) {
        if (key.toLowerCase() !== name.toLowerCase()) continue;
        const v = o[key];
        if (typeof v === "string" && /\d/.test(v)) {
          out[slot] = normalizeTime(v);
          return;
        }
        if (v && typeof v === "object" && "time" in (v as object)) {
          const t = (v as { time?: unknown }).time;
          if (typeof t === "string") {
            out[slot] = normalizeTime(t);
            return;
          }
        }
      }
    }
  };

  tryKeys("imsak", "imsak", "Imsak", "fajr", "Fajr", "Sabah", "sabah");
  tryKeys("gunes", "gunes", "Gunes", "Güneş", "sunrise", "Sunrise", "GunesDogusu");
  tryKeys("ogle", "ogle", "Ogle", "Öğle", "zuhr", "Zuhr", "dhuhr", "Dhuhr");
  tryKeys("ikindi", "ikindi", "Ikindi", "İkindi", "asr", "Asr");
  tryKeys("aksam", "aksam", "Aksam", "Akşam", "maghrib", "Maghrib");
  tryKeys("yatsi", "yatsi", "Yatsi", "Yatsı", "isha", "Isha");

  for (const [k, v] of Object.entries(o)) {
    if (typeof v !== "string" || !/^\d{1,2}[:.]\d{2}/.test(v.trim())) continue;
    const key = k.replace(/time$/i, "").toLowerCase();
    const norm = normalizeTime(v);
    if (/imsak|fajr|sabah/.test(key) && !out.imsak) out.imsak = norm;
    else if (/gunes|güneş|sunrise|gunes/.test(key) && !out.gunes) out.gunes = norm;
    else if (/ogle|öğle|zuhr|dhuhr|ogle/.test(key) && !out.ogle) out.ogle = norm;
    else if (/ikindi|asr/.test(key) && !out.ikindi) out.ikindi = norm;
    else if (/aksam|akşam|maghrib/.test(key) && !out.aksam) out.aksam = norm;
    else if (/yats|isha/.test(key) && !out.yatsi) out.yatsi = norm;
  }

  return out;
}

function unwrapRows(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) {
    return data.filter((x) => x && typeof x === "object") as Record<string, unknown>[];
  }
  if (data && typeof data === "object") {
    const o = data as Record<string, unknown>;
    for (const k of ["data", "result", "items", "prayerTimes", "times", "Data"]) {
      const v = o[k];
      if (Array.isArray(v)) return unwrapRows(v);
    }
    return [o];
  }
  return [];
}

function rowDateHint(o: Record<string, unknown>): string {
  for (const k of [
    "date",
    "Date",
    "tarih",
    "Tarih",
    "gregorianDate",
    "GregorianDate",
    "gun",
    "day",
  ]) {
    const v = o[k];
    if (typeof v === "string") return v;
  }
  return "";
}

/** Sucht die Zeile zum gewünschten Kalendertag (DD.MM.JJJJ) oder nimmt die erste sinnvolle Zeile. */
export function parsePrayerResponse(
  json: unknown,
  wantedBerlinDate: string,
): ParsedPrayerDay | null {
  const rows = unwrapRows(json);
  if (rows.length === 0) return null;

  const [wd, wm, wy] = wantedBerlinDate.split(".").map(Number);
  const wantedKey = `${String(wd).padStart(2, "0")}.${String(wm).padStart(2, "0")}.${wy}`;

  let best: Record<string, unknown> | null = null;
  for (const row of rows) {
    const hint = rowDateHint(row);
    if (hint && (hint.includes(wantedKey) || hint.startsWith(`${wy}-${String(wm).padStart(2, "0")}-${String(wd).padStart(2, "0")}`))) {
      best = row;
      break;
    }
  }
  if (!best) best = rows[0];

  const partial = pickFromObject(best);
  const times = {} as Record<PrayerSlot, string>;
  let filled = 0;
  for (const slot of SLOTS) {
    const v = partial[slot];
    if (v) {
      times[slot] = v;
      filled++;
    } else {
      times[slot] = "–";
    }
  }
  if (filled === 0) return null;

  return {
    times,
    rawDate: rowDateHint(best) || undefined,
  };
}
