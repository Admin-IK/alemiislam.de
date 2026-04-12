"use client";

import Link from "next/link";
import { SubpageShell } from "../components/SubpageShell";
import { useLocale } from "../components/LocaleProvider";

export default function BildungPage() {
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
            {t("orgPages.bildung.title")}
          </h1>

          <div className="prose card legal-page-card" style={{ marginBottom: "1.5rem" }}>
            <p>{t("orgPages.bildung.intro")}</p>
          </div>

          {/* CTA: Mitgliederdaten erfassen */}
          <div
            className="card"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "1.25rem 1.5rem",
              borderLeft: "4px solid var(--color-primary)",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 0.25rem",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--color-primary-dark)",
                }}
              >
                {t("orgPages.bildung.ctaTitle")}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.88rem",
                  color: "var(--color-muted)",
                }}
              >
                {t("orgPages.bildung.ctaText")}
              </p>
            </div>
            <Link
              href="/bildung/mitgliederdaten"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.6rem 1.35rem",
                fontWeight: 600,
                fontSize: "0.95rem",
                borderRadius: "999px",
                background: "var(--color-primary)",
                color: "#fff",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {t("orgPages.bildung.ctaBtn")}
            </Link>
          </div>
        </div>
      </main>
    </SubpageShell>
  );
}
