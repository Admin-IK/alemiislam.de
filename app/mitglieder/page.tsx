"use client";

import Link from "next/link";
import { useState } from "react";
import { SubpageShell } from "../components/SubpageShell";
import { useLocale } from "../components/LocaleProvider";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type VerifyForm = {
  vorname: string;
  nachname: string;
  telefon: string;
  strasse: string;
  plz: string;
  ort: string;
  kindname: string;
};

type ProfileData = VerifyForm & {
  memberId: number;
  contactId: number;
  email: string;
  geburtsdatum: string;
  mitgliedsnummer: string;
};

type ProfileUpdate = {
  email: string;
  passwort: string;
  passwortConfirm: string;
  geburtsdatum: string;
  iban: string;
  bic: string;
  kontoinhaber: string;
};

type Step = "verify" | "profile" | "done";

const EMPTY_VERIFY: VerifyForm = {
  vorname: "",
  nachname: "",
  telefon: "",
  strasse: "",
  plz: "",
  ort: "",
  kindname: "",
};

const EMPTY_UPDATE: ProfileUpdate = {
  email: "",
  passwort: "",
  passwortConfirm: "",
  geburtsdatum: "",
  iban: "",
  bic: "",
  kontoinhaber: "",
};

/* ------------------------------------------------------------------ */
/*  Shared styles                                                     */
/* ------------------------------------------------------------------ */

const pageTitle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
  fontWeight: 600,
  margin: "0 0 0.5rem",
  color: "var(--color-primary-dark)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "var(--color-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  marginBottom: "0.3rem",
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "0.6rem 0.85rem",
  fontFamily: "var(--font-sans)",
  fontSize: "1rem",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius)",
  background: "var(--color-bg)",
  color: "var(--color-text)",
  outline: "none",
};

const fieldGroup: React.CSSProperties = { marginBottom: "1rem" };

const row: React.CSSProperties = {
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "1fr 1fr",
};

const btnPrimary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.65rem 1.5rem",
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  fontWeight: 600,
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  background: "var(--color-primary)",
  color: "#fff",
  marginTop: "0.5rem",
};

const errorBox: React.CSSProperties = {
  padding: "0.75rem 1rem",
  background: "#fef2f2",
  border: "1px solid #fca5a5",
  borderRadius: "var(--radius)",
  color: "#991b1b",
  fontSize: "0.9rem",
  marginBottom: "1rem",
};

const infoBox: React.CSSProperties = {
  padding: "1rem 1.25rem",
  background: "rgba(19,78,74,0.06)",
  border: "1px solid rgba(19,78,74,0.15)",
  borderRadius: "var(--radius)",
  fontSize: "0.92rem",
  color: "var(--color-text)",
  lineHeight: 1.6,
};

const profileDl: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "0.4rem 1.25rem",
  margin: "0 0 1.5rem",
};

const dtSt: React.CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "var(--color-muted)",
  paddingTop: "0.15rem",
};

const ddSt: React.CSSProperties = {
  margin: 0,
  fontWeight: 600,
  color: "var(--color-text)",
};

const stepIndicator: React.CSSProperties = {
  display: "flex",
  gap: "0.5rem",
  marginBottom: "1.75rem",
};

const stepDot = (active: boolean): React.CSSProperties => ({
  width: "2.25rem",
  height: "4px",
  borderRadius: "2px",
  background: active ? "var(--color-primary)" : "var(--color-border)",
  transition: "background 0.3s",
});

const h3Style: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "1.15rem",
  margin: "0 0 1rem",
  color: "var(--color-primary-dark)",
};

/* ------------------------------------------------------------------ */
/*  IBAN validation (ISO 13616 mod-97 checksum)                       */
/* ------------------------------------------------------------------ */

function validateIBAN(
  raw: string,
  t: (k: string, v?: Record<string, string>) => string
): string | null {
  const iban = raw.replace(/\s/g, "").toUpperCase();

  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{12,30}$/.test(iban)) {
    return t("mitglieder.ibanInvalidFormat");
  }

  const lengths: Record<string, number> = {
    DE: 22, AT: 20, CH: 21, FR: 27, NL: 18, BE: 16, IT: 27,
    ES: 24, PT: 25, PL: 28, TR: 26, GB: 22, LU: 20, DK: 18,
  };
  const country = iban.slice(0, 2);
  if (lengths[country] && iban.length !== lengths[country]) {
    return t("mitglieder.ibanWrongLength", {
      country,
      expected: String(lengths[country]),
      actual: String(iban.length),
    });
  }

  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (ch) =>
    String(ch.charCodeAt(0) - 55)
  );
  let remainder = 0;
  for (let i = 0; i < numeric.length; i++) {
    remainder = (remainder * 10 + Number(numeric[i])) % 97;
  }
  if (remainder !== 1) {
    return t("mitglieder.ibanInvalidChecksum");
  }

  return null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MitgliederPage() {
  const { t } = useLocale();
  const [step, setStep] = useState<Step>("verify");
  const [verify, setVerify] = useState<VerifyForm>(EMPTY_VERIFY);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [update, setUpdate] = useState<ProfileUpdate>(EMPTY_UPDATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/mitglieder/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verify),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("mitglieder.notFound"));
        return;
      }
      setProfile(data.profile);
      setUpdate((prev) => ({
        ...prev,
        email: data.profile.email || "",
        geburtsdatum: data.profile.geburtsdatum || "",
      }));
      setStep("profile");
    } catch {
      setError(t("mitglieder.connectionError"));
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (update.passwort !== update.passwortConfirm) {
      setError(t("mitglieder.passwordMismatch"));
      return;
    }
    if (update.passwort.length < 8) {
      setError(t("mitglieder.passwordTooShort"));
      return;
    }
    const ibanError = validateIBAN(update.iban, t);
    if (ibanError) {
      setError(ibanError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/mitglieder/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: profile?.memberId,
          contactId: profile?.contactId,
          mitgliedsnummer: profile?.mitgliedsnummer,
          email: update.email,
          passwort: update.passwort,
          geburtsdatum: update.geburtsdatum,
          iban: update.iban,
          bic: update.bic,
          kontoinhaber: update.kontoinhaber,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("mitglieder.saveError"));
        return;
      }
      setStep("done");
    } catch {
      setError(t("mitglieder.connectionError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SubpageShell>
      <main className="section section-alt">
        <div className="container" style={{ maxWidth: 640 }}>
          <div style={stepIndicator}>
            <span style={stepDot(step === "verify")} />
            <span style={stepDot(step === "profile")} />
            <span style={stepDot(step === "done")} />
          </div>

          {/* =================== STEP 1 =================== */}
          {step === "verify" && (
            <>
              <div className="section-head">
                <h1 style={pageTitle}>{t("mitglieder.title")}</h1>
                <p style={{ margin: 0, color: "var(--color-muted)", maxWidth: "56ch" }}>
                  {t("mitglieder.intro")}
                </p>
              </div>

              {error && <div style={errorBox}>{error}</div>}

              <form onSubmit={handleVerify} className="card" style={{ padding: "1.5rem" }}>
                <div style={row}>
                  <div style={fieldGroup}>
                    <label style={labelStyle}>{t("mitglieder.vorname")} *</label>
                    <input style={inputStyle} required value={verify.vorname}
                      onChange={(e) => setVerify({ ...verify, vorname: e.target.value })}
                      placeholder={t("mitglieder.placeholderVorname")} />
                  </div>
                  <div style={fieldGroup}>
                    <label style={labelStyle}>{t("mitglieder.nachname")} *</label>
                    <input style={inputStyle} required value={verify.nachname}
                      onChange={(e) => setVerify({ ...verify, nachname: e.target.value })}
                      placeholder={t("mitglieder.placeholderNachname")} />
                  </div>
                </div>

                <div style={fieldGroup}>
                  <label style={labelStyle}>{t("mitglieder.telefon")} *</label>
                  <input style={inputStyle} required type="tel" value={verify.telefon}
                    onChange={(e) => setVerify({ ...verify, telefon: e.target.value })}
                    placeholder={t("mitglieder.placeholderTelefon")} />
                </div>

                <div style={row}>
                  <div style={fieldGroup}>
                    <label style={labelStyle}>{t("mitglieder.strasse")} *</label>
                    <input style={inputStyle} required value={verify.strasse}
                      onChange={(e) => setVerify({ ...verify, strasse: e.target.value })}
                      placeholder={t("mitglieder.placeholderStrasse")} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "5rem 1fr", gap: "0.5rem" }}>
                    <div style={fieldGroup}>
                      <label style={labelStyle}>{t("mitglieder.plz")} *</label>
                      <input style={inputStyle} required value={verify.plz}
                        onChange={(e) => setVerify({ ...verify, plz: e.target.value })}
                        placeholder="67059" />
                    </div>
                    <div style={fieldGroup}>
                      <label style={labelStyle}>{t("mitglieder.ort")} *</label>
                      <input style={inputStyle} required value={verify.ort}
                        onChange={(e) => setVerify({ ...verify, ort: e.target.value })}
                        placeholder={t("mitglieder.placeholderOrt")} />
                    </div>
                  </div>
                </div>

                <div style={fieldGroup}>
                  <label style={labelStyle}>{t("mitglieder.kindname")}</label>
                  <input style={inputStyle} value={verify.kindname}
                    onChange={(e) => setVerify({ ...verify, kindname: e.target.value })}
                    placeholder={t("mitglieder.placeholderKind")} />
                </div>

                <button type="submit" style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }} disabled={loading}>
                  {loading ? t("mitglieder.searching") : t("mitglieder.searchBtn")}
                </button>
              </form>
            </>
          )}

          {/* =================== STEP 2 =================== */}
          {step === "profile" && profile && (
            <>
              <div className="section-head">
                <h1 style={pageTitle}>{t("mitglieder.profileTitle")}</h1>
                <p style={{ margin: 0, color: "var(--color-muted)", maxWidth: "56ch" }}>
                  {t("mitglieder.profileIntro")}
                </p>
              </div>

              {error && <div style={errorBox}>{error}</div>}

              <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
                <h3 style={h3Style}>{t("mitglieder.storedData")}</h3>
                <dl style={profileDl}>
                  <dt style={dtSt}>{t("mitglieder.memberNr")}</dt>
                  <dd style={ddSt}>{profile.mitgliedsnummer}</dd>
                  <dt style={dtSt}>{t("mitglieder.vorname")}</dt>
                  <dd style={ddSt}>{profile.vorname}</dd>
                  <dt style={dtSt}>{t("mitglieder.nachname")}</dt>
                  <dd style={ddSt}>{profile.nachname}</dd>
                  <dt style={dtSt}>{t("mitglieder.telefon")}</dt>
                  <dd style={ddSt}>{profile.telefon}</dd>
                  <dt style={dtSt}>{t("mitglieder.address")}</dt>
                  <dd style={ddSt}>{profile.strasse}, {profile.plz} {profile.ort}</dd>
                  {profile.email && (
                    <>
                      <dt style={dtSt}>{t("mitglieder.email")}</dt>
                      <dd style={ddSt}>{profile.email}</dd>
                    </>
                  )}
                  {profile.geburtsdatum && (
                    <>
                      <dt style={dtSt}>{t("mitglieder.birthdate")}</dt>
                      <dd style={ddSt}>{profile.geburtsdatum}</dd>
                    </>
                  )}
                </dl>
              </div>

              <form onSubmit={handleUpdate} className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ ...h3Style, margin: "0 0 0.25rem" }}>{t("mitglieder.missingTitle")}</h3>
                <p style={{ margin: "0 0 1.25rem", fontSize: "0.88rem", color: "var(--color-muted)" }}>
                  {t("mitglieder.missingIntro")}
                </p>

                <div style={fieldGroup}>
                  <label style={labelStyle}>{t("mitglieder.emailLabel")} *</label>
                  <input style={inputStyle} required type="email" value={update.email}
                    onChange={(e) => setUpdate({ ...update, email: e.target.value })}
                    placeholder={t("mitglieder.placeholderEmail")} />
                </div>

                <div style={row}>
                  <div style={fieldGroup}>
                    <label style={labelStyle}>{t("mitglieder.passwordLabel")} *</label>
                    <input style={inputStyle} required type="password" value={update.passwort}
                      onChange={(e) => setUpdate({ ...update, passwort: e.target.value })}
                      placeholder={t("mitglieder.placeholderPassword")} />
                  </div>
                  <div style={fieldGroup}>
                    <label style={labelStyle}>{t("mitglieder.passwordConfirmLabel")} *</label>
                    <input style={inputStyle} required type="password" value={update.passwortConfirm}
                      onChange={(e) => setUpdate({ ...update, passwortConfirm: e.target.value })}
                      placeholder={t("mitglieder.placeholderPasswordConfirm")} />
                  </div>
                </div>

                <div style={fieldGroup}>
                  <label style={labelStyle}>{t("mitglieder.birthdateLabel")} *</label>
                  <input style={inputStyle} required type="date" value={update.geburtsdatum}
                    onChange={(e) => setUpdate({ ...update, geburtsdatum: e.target.value })} />
                </div>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", margin: "1.5rem 0 0.25rem", color: "var(--color-primary-dark)" }}>
                  {t("mitglieder.bankTitle")}
                </h3>
                <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "var(--color-muted)" }}>
                  {t("mitglieder.bankIntro")}
                </p>

                <div style={fieldGroup}>
                  <label style={labelStyle}>{t("mitglieder.iban")} *</label>
                  <input style={inputStyle} required value={update.iban}
                    onChange={(e) => setUpdate({ ...update, iban: e.target.value.toUpperCase().replace(/\s/g, "") })}
                    placeholder={t("mitglieder.placeholderIban")} />
                </div>

                <div style={row}>
                  <div style={fieldGroup}>
                    <label style={labelStyle}>{t("mitglieder.bic")}</label>
                    <input style={inputStyle} value={update.bic}
                      onChange={(e) => setUpdate({ ...update, bic: e.target.value.toUpperCase() })}
                      placeholder={t("mitglieder.placeholderBic")} />
                  </div>
                  <div style={fieldGroup}>
                    <label style={labelStyle}>{t("mitglieder.accountHolder")} *</label>
                    <input style={inputStyle} required value={update.kontoinhaber}
                      onChange={(e) => setUpdate({ ...update, kontoinhaber: e.target.value })}
                      placeholder={t("mitglieder.placeholderHolder")} />
                  </div>
                </div>

                <div style={{ ...infoBox, marginBottom: "1rem", fontSize: "0.85rem" }}>
                  <strong>{t("mitglieder.mandateRef")}</strong>{" "}
                  Bildung Mitgliedsnr. {profile?.mitgliedsnummer}
                  <br />
                  <strong>{t("mitglieder.mandateDate")}</strong>{" "}
                  {new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    .toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                </div>

                <button type="submit" style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }} disabled={loading}>
                  {loading ? t("mitglieder.saving") : t("mitglieder.saveBtn")}
                </button>
              </form>
            </>
          )}

          {/* =================== STEP 3 =================== */}
          {step === "done" && (
            <>
              <div className="section-head">
                <h1 style={pageTitle}>{t("mitglieder.doneTitle")}</h1>
                <p style={{ margin: 0, color: "var(--color-muted)", maxWidth: "56ch" }}>
                  {t("mitglieder.doneIntro")}
                </p>
              </div>

              <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
                <h3 style={h3Style}>{t("mitglieder.loginGuideTitle")}</h3>
                <ol style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--color-text)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                  <li>
                    {t("mitglieder.loginStep1")}{" "}
                    <a href="https://easyverein.com/public/AlemiIslam/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                      easyverein.com/public/AlemiIslam
                    </a>
                  </li>
                  <li>
                    <strong>{t("mitglieder.loginStep2").replace("{bold}", "").replace("{/bold}", "")}</strong>
                  </li>
                </ol>

                <div style={{
                  margin: "0.75rem 0 0.75rem 1.25rem",
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.75rem 1.25rem",
                  background: "var(--color-primary-dark)",
                  color: "#ecfdf5",
                  borderRadius: "var(--radius)",
                  fontFamily: "monospace",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}>
                  AlemiIslam
                </div>

                <ol start={3} style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--color-text)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                  <li>
                    {t("mitglieder.loginStep3Email").replace(/\{bold\}/g, "").replace(/\{\/bold\}/g, "")}
                  </li>
                  <li>
                    {t("mitglieder.loginStep4").replace(/\{bold\}/g, "").replace(/\{\/bold\}/g, "")}
                  </li>
                </ol>
              </div>

              <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/easyverein-icon.svg"
                    alt="EasyVerein"
                    style={{ width: 56, height: 56, borderRadius: 12, flexShrink: 0 }}
                  />
                  <div>
                    <h3 style={{ ...h3Style, margin: 0 }}>{t("mitglieder.appTitle")}</h3>
                    <p style={{ margin: "0.25rem 0 0", fontSize: "0.88rem", color: "var(--color-muted)" }}>
                      {t("mitglieder.appIntro").replace(/\{bold\}/g, "").replace(/\{\/bold\}/g, "")}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.softwaredesign.easyverein&gl=DE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    style={{ gap: "0.4rem" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635zM18.008 10.96l2.992 1.733-2.992 1.733L15.206 12l2.802-2.04z"/></svg>
                    {t("mitglieder.android")}
                  </a>
                  <a
                    href="https://apps.apple.com/de/app/easyverein-vereinsverwaltung/id1582761507"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    style={{ gap: "0.4rem" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    {t("mitglieder.ios")}
                  </a>
                </div>
              </div>

              <div style={infoBox}>
                <strong>{t("mitglieder.important").split("{bold}")[0]}</strong>
                <strong>AlemiIslam</strong>
                {t("mitglieder.important").split("{/bold}").pop()}{" "}
                <a href="mailto:info@alemiislam.de">info@alemiislam.de</a>{" "}
                {t("mitglieder.orCall")}{" "}
                <a href="tel:+49621524705">0621 52 47 05</a>.
              </div>

              <p style={{ marginTop: "1.5rem" }}>
                <Link href="/">{t("mitglieder.backHome")}</Link>
              </p>
            </>
          )}
        </div>
      </main>
    </SubpageShell>
  );
}
