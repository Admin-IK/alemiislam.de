"use client";

import Link from "next/link";
import { SubpageShell } from "../components/SubpageShell";
import { useLocale } from "../components/LocaleProvider";

export default function DatenschutzPage() {
  const { t } = useLocale();

  return (
    <SubpageShell>
      <main className="section">
        <div className="container legal-page">
          <h1
            className="legal-page-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              color: "var(--color-primary-dark)",
            }}
          >
            {t("privacy.title")}
          </h1>
          <div className="prose card legal-page-card">
            <p>{t("privacy.lead")}</p>
            <h2 className="legal-page-h2">{t("privacy.s1Title")}</h2>
            <p>{t("privacy.s1Body")}</p>
            <h2 className="legal-page-h2">{t("privacy.s2Title")}</h2>
            <p>{t("privacy.s2Body")}</p>
            <h2 className="legal-page-h2">{t("privacy.s3Title")}</h2>
            <p>{t("privacy.s3Body")}</p>
            <h2 className="legal-page-h2">{t("privacy.s4Title")}</h2>
            <p>{t("privacy.s4Body")}</p>
            <h2 className="legal-page-h2">{t("privacy.s5Title")}</h2>
            <p>{t("privacy.s5Body")}</p>
            <h2 className="legal-page-h2">{t("privacy.s6Title")}</h2>
            <p>{t("privacy.s6Body")}</p>
            <p style={{ fontSize: "0.95rem", color: "var(--color-muted)" }}>
              {t("privacy.note")}
            </p>
          </div>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href="/">{t("privacy.back")}</Link>
          </p>
        </div>
      </main>
    </SubpageShell>
  );
}
