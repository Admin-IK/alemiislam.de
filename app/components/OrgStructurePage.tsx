"use client";

import { SubpageShell } from "./SubpageShell";
import { useLocale } from "./LocaleProvider";

export type OrgStructureSlug =
  | "bildung"
  | "jugend"
  | "frauen"
  | "frauenJugend";

type Props = { slug: OrgStructureSlug };

export function OrgStructurePage({ slug }: Props) {
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
            {t(`orgPages.${slug}.title`)}
          </h1>
          <div className="prose card legal-page-card">
            <p>{t(`orgPages.${slug}.intro`)}</p>
          </div>
        </div>
      </main>
    </SubpageShell>
  );
}
