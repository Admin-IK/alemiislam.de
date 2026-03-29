"use client";

import Link from "next/link";
import { SubpageShell } from "../components/SubpageShell";
import { useLocale } from "../components/LocaleProvider";

export default function ImpressumPage() {
  const { t } = useLocale();
  const orgLines = t("impressum.orgBlock").split("\n");

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
            {t("impressum.title")}
          </h1>
          <div className="prose card legal-page-card">
            <p>
              <strong>{orgLines[0]}</strong>
              <br />
              {orgLines[1]}
            </p>
            <p>
              Krummlachstraße 6
              <br />
              67059 Ludwigshafen am Rhein
            </p>
            <p>
              {t("contact.phone")}:{" "}
              <a href="tel:+49621524705">0621 52 47 05</a>
              <br />
              {t("contact.email")}:{" "}
              <a href="mailto:info@alemiislam.de">info@alemiislam.de</a>
            </p>
            <p style={{ fontSize: "0.95rem", color: "var(--color-muted)" }}>
              {t("impressum.note")}
            </p>
          </div>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href="/">{t("impressum.back")}</Link>
          </p>
        </div>
      </main>
    </SubpageShell>
  );
}
