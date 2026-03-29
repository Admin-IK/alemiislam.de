/** Datum im Format DD.MM.JJJJ wie von der IGMG-API erwartet (Europe/Berlin). */
export function getBerlinApiDateString(date = new Date()): string {
  const iso = date.toLocaleDateString("sv-SE", { timeZone: "Europe/Berlin" });
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return "01.01.1970";
  return `${d}.${m}.${y}`;
}
