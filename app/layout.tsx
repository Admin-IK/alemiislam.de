import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { LocaleProvider } from "./components/LocaleProvider";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
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
      className={openSans.variable}
    >
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
