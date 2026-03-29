import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jugendorganisation",
  description:
    "Jugendorganisation der Alemi Islam Moschee / IGMG Ortsverein Ludwigshafen West e.V.",
};

export default function JugendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
