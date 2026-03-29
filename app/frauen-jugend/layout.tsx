import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frauen-Jugendorganisation",
  description:
    "Frauen-Jugendorganisation der Alemi Islam Moschee / IGMG Ortsverein Ludwigshafen West e.V.",
};

export default function FrauenJugendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
