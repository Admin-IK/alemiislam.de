"use client";

import Link from "next/link";
import { ContactBlock } from "../components/ContactBlock";
import { SubpageShell } from "../components/SubpageShell";
import { useLocale } from "../components/LocaleProvider";

export default function KontaktPage() {
  const { t } = useLocale();

  return (
    <SubpageShell>
      <main className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 600,
                margin: "0 0 0.5rem",
                color: "var(--color-primary-dark)",
              }}
            >
              {t("contact.title")}
            </h1>
            <p style={{ margin: 0, color: "var(--color-muted)", maxWidth: "56ch" }}>
              {t("contact.intro")}
            </p>
          </div>
          <ContactBlock />
          <p style={{ marginTop: "2rem" }}>
            <Link href="/">{t("impressum.back")}</Link>
          </p>
        </div>
      </main>
    </SubpageShell>
  );
}
