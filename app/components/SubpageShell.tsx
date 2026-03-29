"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { useLocale } from "./LocaleProvider";

export function SubpageShell({ children }: { children: ReactNode }) {
  const { t } = useLocale();

  return (
    <>
      <SiteHeader
        nav={
          <>
            <Link href="/">{t("nav.home")}</Link>
            <Link href="/kontakt">{t("nav.contact")}</Link>
            <Link href="/impressum">{t("nav.imprint")}</Link>
            <Link href="/datenschutz">{t("nav.privacy")}</Link>
          </>
        }
      />
      {children}
      <SubpageFooter />
    </>
  );
}

function SubpageFooter() {
  const { t } = useLocale();
  const year = String(new Date().getFullYear());

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-copy" style={{ margin: 0 }}>
          {t("subpage.footerCopyright", { year })}
        </p>
        <div className="footer-links">
          <Link href="/">{t("nav.home")}</Link>
          <Link href="/kontakt">{t("nav.contact")}</Link>
          <Link href="/impressum">{t("nav.imprint")}</Link>
          <Link href="/datenschutz">{t("nav.privacy")}</Link>
        </div>
      </div>
    </footer>
  );
}
