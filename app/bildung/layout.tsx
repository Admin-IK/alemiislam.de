import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bildung",
  description:
    "Bildungsangebote der Alemi Islam Moschee / IGMG Ortsverein Ludwigshafen West e.V.",
};

export default function BildungLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
