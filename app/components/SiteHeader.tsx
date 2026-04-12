"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavOrgSubmenu } from "./NavOrgSubmenu";
import { useLocale } from "./LocaleProvider";

type SiteHeaderProps = {
  nav: ReactNode;
};

export function SiteHeader({ nav }: SiteHeaderProps) {
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close menu on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="brand" onClick={closeMenu}>
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

        <div className="header-right">
          <LanguageSwitcher />
          <button
            type="button"
            className="mobile-menu-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`hamburger${menuOpen ? " is-open" : ""}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        <nav
          className={`nav${menuOpen ? " is-open" : ""}`}
          aria-label={t("nav.aria")}
        >
          <div className="nav-links" onClick={closeMenu}>
            {nav}
          </div>
          <NavOrgSubmenu />
        </nav>
      </div>

      {menuOpen && (
        <div className="mobile-menu-backdrop" onClick={closeMenu} />
      )}
    </header>
  );
}
