import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frauenorganisation",
  description:
    "Frauenorganisation der Alemi Islam Moschee / IGMG Ortsverein Ludwigshafen West e.V.",
};

export default function FrauenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
