import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitgliederdatenerfassung",
  description:
    "Mitgliederdaten prüfen und ergänzen – Alemi Islam Moschee / IGMG Ortsverein Ludwigshafen West e.V.",
};

export default function MitgliederLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
