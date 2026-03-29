import type { PrayerSlot } from "@/lib/prayerTimes/parse";

const svgAttrs = {
  width: 14,
  height: 14,
  viewBox: "0 0 16 16",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function PrayerSlotIcon({ slot }: { slot: PrayerSlot }) {
  switch (slot) {
    case "imsak":
      return (
        <svg {...svgAttrs}>
          <path d="M8 2v2M8 12v2M3.5 5.5l1.5 1.5M11 9l1.5 1.5M2 8h2M12 8h2M3.5 10.5l1.5-1.5M11 7l1.5-1.5" />
          <circle cx="8" cy="8" r="2.5" />
        </svg>
      );
    case "gunes":
      return (
        <svg {...svgAttrs}>
          <path d="M2 12h12M4 12a4 3.5 0 0 1 8 0" />
          <path d="M8 4.5V2M5.5 5.5L4 4M10.5 5.5L12 4" />
        </svg>
      );
    case "ogle":
      return (
        <svg {...svgAttrs}>
          <circle cx="8" cy="7" r="3" />
          <path d="M5 13h6M8 10v3" />
        </svg>
      );
    case "ikindi":
      return (
        <svg {...svgAttrs}>
          <circle cx="9" cy="6.5" r="2.5" />
          <path d="M3 12h10M6 12c.5-2 2-3 4-3" />
        </svg>
      );
    case "aksam":
      return (
        <svg {...svgAttrs}>
          <path d="M2 11h12" />
          <path d="M5 11a3 2.5 0 0 1 6 0" />
          <path d="M8 5v2M5.5 7l-1.5-1M10.5 7l1.5-1" />
        </svg>
      );
    case "yatsi":
      return (
        <svg {...svgAttrs}>
          <path d="M11 4a5 5 0 1 1-7.5 6.2A5 5 0 0 1 11 4Z" />
        </svg>
      );
  }
}
