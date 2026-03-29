"use client";

import { FACEBOOK_URL, IGMG_URL, MAP_EMBED_SRC, MAP_LINK_URL } from "@/lib/site";
import { useLocale } from "./LocaleProvider";

export function ContactBlock() {
  const { t } = useLocale();

  return (
    <div className="contact-grid">
      <div className="card contact-card">
        <h3
          className="card-icon"
          style={{
            fontFamily: "var(--font-display)",
            marginBottom: "1rem",
          }}
        >
          {t("contact.directTitle")}
        </h3>
        <dl>
          <dt>{t("contact.phone")}</dt>
          <dd>
            <a href="tel:+49621524705">0621 52 47 05</a>
          </dd>
          <dt>{t("contact.email")}</dt>
          <dd>
            <a href="mailto:info@alemiislam.de">info@alemiislam.de</a>
          </dd>
          <dt>{t("contact.address")}</dt>
          <dd>
            Krummlachstraße 6<br />
            67059 Ludwigshafen am Rhein
          </dd>
        </dl>
        <div className="social-row">
          <a
            className="social-btn"
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("contact.followFb")}
          </a>
          <a
            className="social-btn"
            href={IGMG_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("contact.igmgSite")}
          </a>
        </div>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <iframe
          title={t("contact.mapTitle")}
          className="map-embed"
          src={MAP_EMBED_SRC}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
        <p
          style={{
            padding: "0.75rem 1rem",
            margin: 0,
            fontSize: "0.85rem",
            color: "var(--color-muted)",
          }}
        >
          <a
            href={MAP_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("contact.mapLink")}
          </a>
        </p>
      </div>
    </div>
  );
}
