"use client";

import { useMemo } from "react";
import { selectDailyWisdom } from "@/lib/dailyWisdom/select";
import { useLocale } from "./LocaleProvider";

export function DailyWisdomSection() {
  const { locale, t } = useLocale();
  const entry = useMemo(() => selectDailyWisdom(), []);
  const translation = locale === "tr" ? entry.tr : entry.de;
  const source = locale === "tr" ? entry.sourceTr : entry.sourceDe;
  const typeLabel =
    entry.type === "ayah" ? t("wisdom.typeAyah") : t("wisdom.typeHadith");

  return (
    <section
      className="wisdom-section"
      aria-labelledby="wisdom-heading"
      id="tagesweisheit"
    >
      <div className="container wisdom-card">
        <div className="wisdom-head">
          <span className={`wisdom-badge wisdom-badge--${entry.type}`}>
            {typeLabel}
          </span>
          <h2 id="wisdom-heading" className="wisdom-title">
            {t("wisdom.title")}
          </h2>
        </div>
        <p className="wisdom-arabic" lang="ar" dir="rtl">
          {entry.arabic}
        </p>
        <p className="wisdom-translation" lang={locale}>
          {translation}
        </p>
        <p className="wisdom-source">{source}</p>
      </div>
    </section>
  );
}
