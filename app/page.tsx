"use client";

import Link from "next/link";
import {
  EASYVEREIN_URL,
  FACEBOOK_URL,
  IGMG_URL,
} from "@/lib/site";
import { ContactBlock } from "./components/ContactBlock";
import { FacebookPageEmbed } from "./components/FacebookPageEmbed";
import { DailyWisdomSection } from "./components/DailyWisdomSection";
import { PrayerTimesSection } from "./components/PrayerTimesSection";
import { SiteHeader } from "./components/SiteHeader";
import { useLocale } from "./components/LocaleProvider";

export default function HomePage() {
  const { t } = useLocale();

  return (
    <>
      <SiteHeader
        nav={
          <>
            <a href="#ueber-uns">{t("nav.about")}</a>
            <a href="#angebot">{t("nav.offer")}</a>
            <a href="#aktuelles">{t("nav.news")}</a>
            <Link href="/kontakt" className="nav-cta">
              {t("nav.contact")}
            </Link>
          </>
        }
      />

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="container">
            <p className="hero-eyebrow">{t("hero.eyebrow")}</p>
            <h1 id="hero-heading">{t("hero.title")}</h1>
            <p className="hero-lead">{t("hero.lead")}</p>
            <div className="hero-actions">
              <Link className="btn btn-light" href="/kontakt">
                {t("hero.visit")}
              </Link>
              <a
                className="btn btn-outline-light"
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("hero.facebook")}
              </a>
            </div>
          </div>
        </section>

        <PrayerTimesSection />

        <DailyWisdomSection />

        <section id="ueber-uns" className="section">
          <div className="container">
            <div className="section-head">
              <h2>{t("about.title")}</h2>
              <p>
                {t("about.introBefore")}
                <a href={IGMG_URL} target="_blank" rel="noopener noreferrer">
                  {t("about.igmgLink")}
                </a>
                {t("about.introAfter")}
              </p>
            </div>
            <div className="grid-2">
              <div className="prose card">
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    margin: "0 0 1rem",
                    fontSize: "1.35rem",
                    color: "var(--color-primary-dark)",
                  }}
                >
                  {t("about.historyTitle")}
                </h3>
                <p>{t("about.historyP1")}</p>
                <p>{t("about.historyP2")}</p>
              </div>
              <div className="prose card">
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    margin: "0 0 1rem",
                    fontSize: "1.35rem",
                    color: "var(--color-primary-dark)",
                  }}
                >
                  {t("about.networkTitle")}
                </h3>
                <p>
                  {t("about.networkP1")}{" "}
                  <strong>{t("about.openMosqueDay")}</strong>{" "}
                  {t("about.networkP1b")}
                </p>
                <p>{t("about.networkP2")}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="angebot" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <h2>{t("offer.title")}</h2>
              <p>{t("offer.intro")}</p>
            </div>
            <div className="grid-3">
              <article className="card">
                <div className="card-icon" aria-hidden>
                  ◈
                </div>
                <h3>{t("offer.prayerTitle")}</h3>
                <p>{t("offer.prayerText")}</p>
              </article>
              <article className="card">
                <div className="card-icon" aria-hidden>
                  ✦
                </div>
                <h3>{t("offer.eduTitle")}</h3>
                <p>{t("offer.eduText")}</p>
              </article>
              <article className="card">
                <div className="card-icon" aria-hidden>
                  ◎
                </div>
                <h3>{t("offer.cityTitle")}</h3>
                <p>{t("offer.cityText")}</p>
              </article>
            </div>
            <p style={{ marginTop: "2rem", color: "var(--color-muted)" }}>
              <strong>{t("offer.memberStrong")}</strong>{" "}
              <a
                href={EASYVEREIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("offer.memberLink")}
              </a>
            </p>
          </div>
        </section>

        <section id="aktuelles" className="section">
          <div className="container">
            <div className="section-head">
              <h2>{t("news.title")}</h2>
              <p>
                {t("news.introBefore")}{" "}
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("news.facebookPage")}
                </a>
                {t("news.introAfter")}
              </p>
            </div>
            <div className="grid-2 news-feed-grid">
              <div className="news-feed-main">
                <p
                  className="news-feed-note"
                  style={{
                    margin: "0 0 1rem",
                    fontSize: "0.95rem",
                    color: "var(--color-muted)",
                  }}
                >
                  {t("news.feedNote")}
                </p>
                <FacebookPageEmbed iframeTitle={t("news.embedIframeTitle")} />
              </div>
              <div className="news-feed-side">
                <ul className="news-list card">
                  <li>
                    <div className="news-meta">{t("news.metaFed")}</div>
                    <a
                      href={`${IGMG_URL}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("news.linkFed")}
                    </a>
                  </li>
                  <li>
                    <div className="news-meta">{t("news.metaLocal")}</div>
                    <Link href="/kontakt">{t("news.linkLocal")}</Link>
                  </li>
                  <li>
                    <div className="news-meta">{t("news.metaSolidarity")}</div>
                    <span style={{ color: "var(--color-text)" }}>
                      {t("news.textSolidarity")}
                    </span>
                  </li>
                </ul>
                <div
                  className="card"
                  style={{ alignSelf: "start", marginTop: "1.25rem" }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.35rem",
                      marginTop: 0,
                      color: "var(--color-primary-dark)",
                    }}
                  >
                    {t("news.shortTitle")}
                  </h3>
                  <dl style={{ margin: 0 }}>
                    <dt
                      style={{
                        fontSize: "0.78rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--color-muted)",
                      }}
                    >
                      {t("news.dtClub")}
                    </dt>
                    <dd style={{ margin: "0.25rem 0 1rem", fontWeight: 600 }}>
                      IGMG Ortsverein Ludwigshafen West e.V.
                    </dd>
                    <dt
                      style={{
                        fontSize: "0.78rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "var(--color-muted)",
                      }}
                    >
                      {t("news.dtAddress")}
                    </dt>
                    <dd style={{ margin: "0.25rem 0 0", fontWeight: 600 }}>
                      Krummlachstraße 6<br />
                      67059 Ludwigshafen am Rhein
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <h2>{t("contact.title")}</h2>
              <p>{t("contact.intro")}</p>
              <p style={{ margin: "0.75rem 0 0", fontSize: "0.95rem" }}>
                <Link href="/kontakt">{t("nav.contact")}</Link>
                {" · "}
                <Link href="/impressum">{t("nav.imprint")}</Link>
                {" · "}
                <Link href="/datenschutz">{t("nav.privacy")}</Link>
              </p>
            </div>
            <ContactBlock />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <p style={{ margin: 0, color: "#ecfdf5", fontWeight: 600 }}>
              {t("footer.title")}
            </p>
            <p className="footer-copy">{t("footer.line")}</p>
          </div>
          <div className="footer-links">
            <Link href="/kontakt">{t("nav.contact")}</Link>
            <Link href="/impressum">{t("footer.imprint")}</Link>
            <Link href="/datenschutz">{t("footer.privacy")}</Link>
            <a href={IGMG_URL} target="_blank" rel="noopener noreferrer">
              {t("footer.igmgFederal")}
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("footer.facebook")}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
