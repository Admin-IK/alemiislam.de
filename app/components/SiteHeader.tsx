"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavOrgSubmenu } from "./NavOrgSubmenu";
import { useLocale } from "./LocaleProvider";

type SiteHeaderProps = {
  nav: ReactNode;
};

export function SiteHeader({ nav }: SiteHeaderProps) {
  const { t } = useLocale();

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand">
          <span className="sr-only">{t("header.brandSr")}</span>
          <Image
            src="/logo-igmg-alemi-islam.png"
            alt=""
            width={1491}
            height={172}
            className="brand-logo"
            priority
            aria-hidden
          />
        </Link>
        <nav className="nav" aria-label={t("nav.aria")}>
          {nav}
          <NavOrgSubmenu />
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
