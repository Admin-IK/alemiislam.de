import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { LocaleProvider } from "./components/LocaleProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alemi Islam Moschee – IGMG Ortsverein Ludwigshafen West",
    template: "%s | Alemi Islam Moschee",
  },
  description:
    "Islamische Gemeinschaft Millî Görüş (IGMG) Ortsverein Ludwigshafen West e.V. – Alemi Islam Moschee in Ludwigshafen am Rhein: Gebet, Bildung und Gemeinschaft.",
  keywords: [
    "Alemi Islam Moschee-Ludwigshafen",
    "IGMG Ludwigshafen West",
    "Moschee Ludwigshafen",
    "Alem-i Islam",
  ],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Alemi Islam Moschee",
    title: "Alemi Islam Moschee – Ludwigshafen am Rhein",
    description:
      "Willkommen in der Gemeinde des IGMG Ortsvereins Ludwigshafen West e.V.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${dmSans.variable} ${cormorant.variable}`}
    >
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
