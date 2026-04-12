import { ayahs, hadiths, type WisdomEntry } from "./data";

function berlinDayIndex(date = new Date()): number {
  const iso = date.toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" });
  const [y, m, d] = iso.split("-").map(Number);
  const start = Date.UTC(y, 0, 1);
  const now = Date.UTC(y, m - 1, d);
  return Math.floor((now - start) / 86_400_000);
}

export function selectDailyWisdom(date = new Date()): WisdomEntry {
  const dayIdx = berlinDayIndex(date);
  const isHadith = dayIdx % 2 === 1;
  const pool = isHadith ? hadiths : ayahs;
  return pool[Math.floor(dayIdx / 2) % pool.length];
}
