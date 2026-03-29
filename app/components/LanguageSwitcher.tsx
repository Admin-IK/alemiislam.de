"use client";

import { useLocale } from "./LocaleProvider";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={t("lang.group")}
    >
      <button
        type="button"
        className={`lang-switch-btn${locale === "de" ? " is-active" : ""}`}
        onClick={() => setLocale("de")}
        aria-pressed={locale === "de"}
        title={t("lang.de")}
      >
        <span className="lang-switch-flag" aria-hidden>
          🇩🇪
        </span>
        <span className="lang-switch-code">DE</span>
      </button>
      <button
        type="button"
        className={`lang-switch-btn${locale === "tr" ? " is-active" : ""}`}
        onClick={() => setLocale("tr")}
        aria-pressed={locale === "tr"}
        title={t("lang.tr")}
      >
        <span className="lang-switch-flag" aria-hidden>
          🇹🇷
        </span>
        <span className="lang-switch-code">TR</span>
      </button>
    </div>
  );
}
