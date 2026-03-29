"use client";

import Link from "next/link";
import { useState } from "react";
import { SubpageShell } from "../components/SubpageShell";

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
  geburtsdatum: string;
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
  geburtsdatum: "",
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

const label: React.CSSProperties = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "var(--color-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  marginBottom: "0.3rem",
};

const input: React.CSSProperties = {
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

const fieldGroup: React.CSSProperties = {
  marginBottom: "1rem",
};

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

const dtStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "var(--color-muted)",
  paddingTop: "0.15rem",
};

const ddStyle: React.CSSProperties = {
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

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function MitgliederPage() {
  const [step, setStep] = useState<Step>("verify");
  const [verify, setVerify] = useState<VerifyForm>(EMPTY_VERIFY);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [update, setUpdate] = useState<ProfileUpdate>(EMPTY_UPDATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------- Step 1: Verifizierung ---------- */

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
        setError(
          data.error ||
            "Mitglied konnte nicht gefunden werden. Bitte prüfen Sie Ihre Angaben."
        );
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
      setError("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  }

  /* ---------- Step 2: Profil ergänzen ---------- */

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    setLoading(true);

    try {
      const res = await fetch("/api/mitglieder/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: profile?.memberId,
          contactId: profile?.contactId,
          email: update.email,
          geburtsdatum: update.geburtsdatum,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Fehler beim Speichern. Bitte erneut versuchen.");
        return;
      }

      setStep("done");
    } catch {
      setError("Verbindungsfehler. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  }

  /* ---------- Render ---------- */

  return (
    <SubpageShell>
      <main className="section section-alt">
        <div className="container" style={{ maxWidth: 640 }}>
          {/* Step indicator */}
          <div style={stepIndicator}>
            <span style={stepDot(step === "verify")} />
            <span style={stepDot(step === "profile")} />
            <span style={stepDot(step === "done")} />
          </div>

          {/* =================== STEP 1 =================== */}
          {step === "verify" && (
            <>
              <div className="section-head">
                <h1 style={pageTitle}>Mitgliederdatenerfassung</h1>
                <p
                  style={{
                    margin: 0,
                    color: "var(--color-muted)",
                    maxWidth: "56ch",
                  }}
                >
                  Bitte geben Sie Ihre Daten ein, damit wir Ihr Profil in
                  EasyVerein finden und anzeigen können. Alle Angaben werden
                  vertraulich behandelt.
                </p>
              </div>

              {error && <div style={errorBox}>{error}</div>}

              <form
                onSubmit={handleVerify}
                className="card"
                style={{ padding: "1.5rem" }}
              >
                <div style={row}>
                  <div style={fieldGroup}>
                    <label style={label}>Vorname *</label>
                    <input
                      style={input}
                      required
                      value={verify.vorname}
                      onChange={(e) =>
                        setVerify({ ...verify, vorname: e.target.value })
                      }
                      placeholder="z. B. Mehmet"
                    />
                  </div>
                  <div style={fieldGroup}>
                    <label style={label}>Nachname *</label>
                    <input
                      style={input}
                      required
                      value={verify.nachname}
                      onChange={(e) =>
                        setVerify({ ...verify, nachname: e.target.value })
                      }
                      placeholder="z. B. Yılmaz"
                    />
                  </div>
                </div>

                <div style={fieldGroup}>
                  <label style={label}>Telefonnummer *</label>
                  <input
                    style={input}
                    required
                    type="tel"
                    value={verify.telefon}
                    onChange={(e) =>
                      setVerify({ ...verify, telefon: e.target.value })
                    }
                    placeholder="z. B. 0176 12345678"
                  />
                </div>

                <div style={row}>
                  <div style={fieldGroup}>
                    <label style={label}>Straße + Hausnr. *</label>
                    <input
                      style={input}
                      required
                      value={verify.strasse}
                      onChange={(e) =>
                        setVerify({ ...verify, strasse: e.target.value })
                      }
                      placeholder="z. B. Musterstr. 12"
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "5rem 1fr", gap: "0.5rem" }}>
                    <div style={fieldGroup}>
                      <label style={label}>PLZ *</label>
                      <input
                        style={input}
                        required
                        value={verify.plz}
                        onChange={(e) =>
                          setVerify({ ...verify, plz: e.target.value })
                        }
                        placeholder="67059"
                      />
                    </div>
                    <div style={fieldGroup}>
                      <label style={label}>Ort *</label>
                      <input
                        style={input}
                        required
                        value={verify.ort}
                        onChange={(e) =>
                          setVerify({ ...verify, ort: e.target.value })
                        }
                        placeholder="Ludwigshafen"
                      />
                    </div>
                  </div>
                </div>

                <div style={fieldGroup}>
                  <label style={label}>Name eines Kindes (optional)</label>
                  <input
                    style={input}
                    value={verify.kindname}
                    onChange={(e) =>
                      setVerify({ ...verify, kindname: e.target.value })
                    }
                    placeholder="Falls vorhanden, z. B. Ayşe"
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    ...btnPrimary,
                    opacity: loading ? 0.7 : 1,
                  }}
                  disabled={loading}
                >
                  {loading ? "Wird gesucht …" : "Profil suchen"}
                </button>
              </form>
            </>
          )}

          {/* =================== STEP 2 =================== */}
          {step === "profile" && profile && (
            <>
              <div className="section-head">
                <h1 style={pageTitle}>Profil prüfen &amp; ergänzen</h1>
                <p
                  style={{
                    margin: 0,
                    color: "var(--color-muted)",
                    maxWidth: "56ch",
                  }}
                >
                  Wir haben Ihr Profil gefunden. Bitte prüfen Sie die Daten und
                  ergänzen Sie die fehlenden Angaben.
                </p>
              </div>

              {error && <div style={errorBox}>{error}</div>}

              {/* Existing data display */}
              <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    margin: "0 0 1rem",
                    color: "var(--color-primary-dark)",
                  }}
                >
                  Hinterlegte Daten
                </h3>
                <dl style={profileDl}>
                  <dt style={dtStyle}>Mitgliedsnr.</dt>
                  <dd style={ddStyle}>{profile.mitgliedsnummer}</dd>
                  <dt style={dtStyle}>Vorname</dt>
                  <dd style={ddStyle}>{profile.vorname}</dd>
                  <dt style={dtStyle}>Nachname</dt>
                  <dd style={ddStyle}>{profile.nachname}</dd>
                  <dt style={dtStyle}>Telefon</dt>
                  <dd style={ddStyle}>{profile.telefon}</dd>
                  <dt style={dtStyle}>Adresse</dt>
                  <dd style={ddStyle}>
                    {profile.strasse}, {profile.plz} {profile.ort}
                  </dd>
                  {profile.email && (
                    <>
                      <dt style={dtStyle}>E-Mail</dt>
                      <dd style={ddStyle}>{profile.email}</dd>
                    </>
                  )}
                  {profile.geburtsdatum && (
                    <>
                      <dt style={dtStyle}>Geburtsdatum</dt>
                      <dd style={ddStyle}>{profile.geburtsdatum}</dd>
                    </>
                  )}
                </dl>
              </div>

              {/* Update form */}
              <form
                onSubmit={handleUpdate}
                className="card"
                style={{ padding: "1.5rem" }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    margin: "0 0 0.25rem",
                    color: "var(--color-primary-dark)",
                  }}
                >
                  Fehlende Angaben ergänzen
                </h3>
                <p
                  style={{
                    margin: "0 0 1.25rem",
                    fontSize: "0.88rem",
                    color: "var(--color-muted)",
                  }}
                >
                  Diese Informationen werden für Ihren EasyVerein-Login benötigt.
                </p>

                <div style={fieldGroup}>
                  <label style={label}>E-Mail-Adresse (für Login) *</label>
                  <input
                    style={input}
                    required
                    type="email"
                    value={update.email}
                    onChange={(e) =>
                      setUpdate({ ...update, email: e.target.value })
                    }
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>

                <div style={fieldGroup}>
                  <label style={label}>Geburtsdatum *</label>
                  <input
                    style={input}
                    required
                    type="date"
                    value={update.geburtsdatum}
                    onChange={(e) =>
                      setUpdate({ ...update, geburtsdatum: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    ...btnPrimary,
                    opacity: loading ? 0.7 : 1,
                  }}
                  disabled={loading}
                >
                  {loading ? "Wird gespeichert …" : "Daten speichern & weiter"}
                </button>
              </form>
            </>
          )}

          {/* =================== STEP 3 =================== */}
          {step === "done" && (
            <>
              <div className="section-head">
                <h1 style={pageTitle}>Daten erfolgreich gespeichert</h1>
                <p
                  style={{
                    margin: 0,
                    color: "var(--color-muted)",
                    maxWidth: "56ch",
                  }}
                >
                  Ihre Daten wurden aktualisiert. Nutzen Sie die folgende
                  Anleitung, um sich bei EasyVerein einzuloggen.
                </p>
              </div>

              {/* Schritt 1: Passwort anfordern */}
              <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    margin: "0 0 1rem",
                    color: "var(--color-primary-dark)",
                  }}
                >
                  Schritt 1: Passwort erstellen
                </h3>
                <ol
                  style={{
                    margin: 0,
                    paddingLeft: "1.25rem",
                    color: "var(--color-text)",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  <li>
                    Öffnen Sie die Login-Seite:{" "}
                    <a
                      href="https://easyverein.com/public/AlemiIslam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 600 }}
                    >
                      easyverein.com/public/AlemiIslam
                    </a>
                  </li>
                  <li>
                    Klicken Sie auf{" "}
                    <strong>&bdquo;Passwort vergessen?&ldquo;</strong>
                  </li>
                  <li>
                    Geben Sie die <strong>E-Mail-Adresse</strong> ein, die Sie
                    soeben hinterlegt haben.
                  </li>
                  <li>
                    Sie erhalten eine E-Mail mit einem Link zum{" "}
                    <strong>Passwort erstellen</strong>. Prüfen Sie auch Ihren
                    Spam-Ordner.
                  </li>
                </ol>
              </div>

              {/* Schritt 2: Einloggen */}
              <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    margin: "0 0 1rem",
                    color: "var(--color-primary-dark)",
                  }}
                >
                  Schritt 2: Bei EasyVerein einloggen
                </h3>
                <ol
                  style={{
                    margin: 0,
                    paddingLeft: "1.25rem",
                    color: "var(--color-text)",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  <li>
                    Öffnen Sie:{" "}
                    <a
                      href="https://easyverein.com/public/AlemiIslam/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 600 }}
                    >
                      easyverein.com/public/AlemiIslam
                    </a>
                  </li>
                  <li>
                    Geben Sie als <strong>Vereinskürzel</strong> ein:
                  </li>
                </ol>

                <div
                  style={{
                    margin: "0.75rem 0 0.75rem 1.25rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1.25rem",
                    background: "var(--color-primary-dark)",
                    color: "#ecfdf5",
                    borderRadius: "var(--radius)",
                    fontFamily: "monospace",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  AlemiIslam
                </div>

                <ol
                  start={3}
                  style={{
                    margin: 0,
                    paddingLeft: "1.25rem",
                    color: "var(--color-text)",
                    lineHeight: 1.8,
                    fontSize: "0.95rem",
                  }}
                >
                  <li>
                    Geben Sie Ihre <strong>E-Mail-Adresse</strong> und das soeben
                    erstellte <strong>Passwort</strong> ein.
                  </li>
                  <li>
                    Klicken Sie auf <strong>&bdquo;Anmelden&ldquo;</strong>.
                  </li>
                </ol>
              </div>

              {/* EasyVerein App */}
              <div className="card" style={{ padding: "1.5rem", marginBottom: "1.25rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    margin: "0 0 0.5rem",
                    color: "var(--color-primary-dark)",
                  }}
                >
                  EasyVerein App installieren
                </h3>
                <p
                  style={{
                    margin: "0 0 1rem",
                    fontSize: "0.92rem",
                    color: "var(--color-muted)",
                  }}
                >
                  Sie können auch bequem über die App auf Ihr Mitgliederprofil
                  zugreifen. Verwenden Sie beim Login das Vereinskürzel{" "}
                  <strong>AlemiIslam</strong>.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.easyverein.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    Android (Google Play)
                  </a>
                  <a
                    href="https://apps.apple.com/app/easyverein/id1297726596"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                  >
                    iPhone / iPad (App Store)
                  </a>
                </div>
              </div>

              <div style={infoBox}>
                <strong>Wichtig:</strong> Das Vereinskürzel lautet immer{" "}
                <strong>AlemiIslam</strong> (ohne Leerzeichen, Groß-/Kleinschreibung
                beachten). Sollten Sie Probleme beim Login haben, wenden Sie sich
                bitte an{" "}
                <a href="mailto:info@alemiislam.de">info@alemiislam.de</a> oder
                rufen Sie uns an unter{" "}
                <a href="tel:+49621524705">0621 52 47 05</a>.
              </div>

              <p style={{ marginTop: "1.5rem" }}>
                <Link href="/">← Zur Startseite</Link>
              </p>
            </>
          )}
        </div>
      </main>
    </SubpageShell>
  );
}
