import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitgliederdaten erfassen – Bildung",
  description:
    "Erfassen und aktualisieren Sie Ihre Mitgliedsdaten für die Bildungseinrichtung der Alemi Islam Moschee / IGMG Ortsverein Ludwigshafen West e.V.",
};

export default function MitgliederdatenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
