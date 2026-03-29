"use client";

import { useCallback, useState } from "react";
import { SubpageShell } from "../components/SubpageShell";

type MemberStatus = {
  id: number;
  membershipNumber: string;
  firstName: string;
  familyName: string;
  email: string;
  phone: string;
  hasEmail: boolean;
  hasIban: boolean;
  hasDateOfBirth: boolean;
  hasPassword: boolean;
  internalNote: string;
  status: "completed" | "partial" | "pending";
};

type DashboardData = {
  total: number;
  completedCount: number;
  partialCount: number;
  pendingCount: number;
  members: MemberStatus[];
};

type Filter = "all" | "completed" | "partial" | "pending";

const STATUS_LABELS: Record<MemberStatus["status"], string> = {
  completed: "Abgeschlossen",
  partial: "Teilweise",
  pending: "Ausstehend",
};

const STATUS_COLORS: Record<MemberStatus["status"], string> = {
  completed: "#16a34a",
  partial: "#d97706",
  pending: "#dc2626",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const fetchData = useCallback(async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/mitglieder/admin?password=${encodeURIComponent(pw)}`
      );
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Fehler beim Laden.");
        return;
      }
      setData(json);
    } catch {
      setError("Verbindungsfehler.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(password);
  };

  const filtered = data
    ? filter === "all"
      ? data.members
      : data.members.filter((m) => m.status === filter)
    : [];

  // Extract date from internalNote for sorting
  const sortedMembers = [...filtered].sort((a, b) => {
    if (a.internalNote && !b.internalNote) return -1;
    if (!a.internalNote && b.internalNote) return 1;
    return a.familyName.localeCompare(b.familyName, "de");
  });

  // Recent activity: members who updated in the last 7 days
  const recentActivity = data
    ? (() => {
        const now = Date.now();
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
        const recent: { member: MemberStatus; date: Date; dayLabel: string; time: string }[] = [];

        for (const m of data.members) {
          if (!m.internalNote) continue;
          const match = m.internalNote.match(/(\d{2})\.(\d{2})\.(\d{4})/);
          if (!match) continue;
          const [, dd, mm, yyyy] = match;
          const timeMatch = m.internalNote.match(/(\d{2}:\d{2})/);
          const time = timeMatch ? timeMatch[1] : "";
          const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
          if (date.getTime() < sevenDaysAgo) continue;
          recent.push({ member: m, date, dayLabel: `${dd}.${mm}.${yyyy}`, time });
        }

        // Sort newest first
        recent.sort((a, b) => b.date.getTime() - a.date.getTime() || b.time.localeCompare(a.time));
        return recent;
      })()
    : [];

  return (
    <SubpageShell>
      <main className="section section-alt">
        <div className="container" style={{ maxWidth: 960 }}>
          {!data ? (
            /* ---- Login ---- */
            <div style={{ maxWidth: 400, margin: "0 auto" }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 600,
                  margin: "0 0 0.5rem",
                  color: "var(--color-primary-dark)",
                }}
              >
                Admin Dashboard
              </h1>
              <p style={{ color: "var(--color-muted)", margin: "0 0 1.5rem" }}>
                Passwort eingeben, um die Mitglieder-Übersicht zu sehen.
              </p>

              {error && (
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    background: "#fef2f2",
                    border: "1px solid #fca5a5",
                    borderRadius: "var(--radius)",
                    color: "#991b1b",
                    fontSize: "0.9rem",
                    marginBottom: "1rem",
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="card" style={{ padding: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--color-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: "0.3rem",
                  }}
                >
                  Admin-Passwort
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
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
                    marginBottom: "1rem",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.65rem 1.5rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    background: "var(--color-primary)",
                    color: "#fff",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Wird geladen …" : "Anmelden"}
                </button>
              </form>
            </div>
          ) : (
            /* ---- Dashboard ---- */
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 600,
                    margin: 0,
                    color: "var(--color-primary-dark)",
                  }}
                >
                  Mitglieder-Übersicht
                </h1>
                <button
                  onClick={() => fetchData(password)}
                  disabled={loading}
                  style={{
                    padding: "0.45rem 1rem",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    borderRadius: "999px",
                    border: "1px solid var(--color-border)",
                    cursor: "pointer",
                    background: "var(--color-surface)",
                    color: "var(--color-text)",
                  }}
                >
                  {loading ? "Laden …" : "Aktualisieren"}
                </button>
              </div>

              {/* Stats cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <StatCard
                  label="Gesamt"
                  value={data.total}
                  color="var(--color-primary-dark)"
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                />
                <StatCard
                  label="Abgeschlossen"
                  value={data.completedCount}
                  color="#16a34a"
                  active={filter === "completed"}
                  onClick={() => setFilter("completed")}
                />
                <StatCard
                  label="Teilweise"
                  value={data.partialCount}
                  color="#d97706"
                  active={filter === "partial"}
                  onClick={() => setFilter("partial")}
                />
                <StatCard
                  label="Ausstehend"
                  value={data.pendingCount}
                  color="#dc2626"
                  active={filter === "pending"}
                  onClick={() => setFilter("pending")}
                />
              </div>

              {/* Last 7 days activity */}
              <div
                className="card"
                style={{ padding: "1.25rem", marginBottom: "1.5rem" }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    margin: "0 0 0.25rem",
                    color: "var(--color-primary-dark)",
                  }}
                >
                  Letzte 7 Tage
                </h2>
                <p
                  style={{
                    margin: "0 0 0.75rem",
                    fontSize: "0.82rem",
                    color: "var(--color-muted)",
                  }}
                >
                  {recentActivity.length}{" "}
                  {recentActivity.length === 1
                    ? "Aktualisierung"
                    : "Aktualisierungen"}
                </p>
                {recentActivity.length === 0 ? (
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      color: "var(--color-muted)",
                    }}
                  >
                    Keine Aktivität in den letzten 7 Tagen.
                  </p>
                ) : (
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: "0.86rem",
                    }}
                  >
                    <tbody>
                      {recentActivity.map((r) => (
                        <tr
                          key={r.member.id}
                          style={{
                            borderBottom: "1px solid var(--color-border)",
                          }}
                        >
                          <td
                            style={{
                              padding: "0.45rem 0.5rem 0.45rem 0",
                              fontVariantNumeric: "tabular-nums",
                              color: "var(--color-muted)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {r.dayLabel}
                            {r.time && (
                              <span style={{ marginLeft: "0.4rem" }}>
                                {r.time}
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              padding: "0.45rem 0.5rem",
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {r.member.firstName} {r.member.familyName}
                          </td>
                          <td
                            style={{
                              padding: "0.45rem 0.5rem",
                              color: "var(--color-muted)",
                              fontSize: "0.82rem",
                            }}
                          >
                            Nr. {r.member.membershipNumber}
                          </td>
                          <td
                            style={{
                              padding: "0.45rem 0 0.45rem 0.5rem",
                              color: "var(--color-muted)",
                              fontSize: "0.82rem",
                            }}
                          >
                            {r.member.email || "–"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Table */}
              <div
                className="card"
                style={{ padding: 0, overflow: "auto" }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.88rem",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "var(--color-bg)",
                        borderBottom: "2px solid var(--color-border)",
                      }}
                    >
                      <Th>Status</Th>
                      <Th>Nr.</Th>
                      <Th>Name</Th>
                      <Th>E-Mail</Th>
                      <Th>Telefon</Th>
                      <Th align="center">E-Mail</Th>
                      <Th align="center">IBAN</Th>
                      <Th align="center">Geb.</Th>
                      <Th>Aktiviert am</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMembers.map((m) => (
                      <tr
                        key={m.id}
                        style={{
                          borderBottom: "1px solid var(--color-border)",
                        }}
                      >
                        <Td>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "0.15rem 0.55rem",
                              borderRadius: "999px",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "#fff",
                              background: STATUS_COLORS[m.status],
                            }}
                          >
                            {STATUS_LABELS[m.status]}
                          </span>
                        </Td>
                        <Td>{m.membershipNumber}</Td>
                        <Td style={{ fontWeight: 600 }}>
                          {m.familyName}, {m.firstName}
                        </Td>
                        <Td>
                          <span style={{ fontSize: "0.82rem" }}>
                            {m.email || "–"}
                          </span>
                        </Td>
                        <Td>{m.phone || "–"}</Td>
                        <Td align="center">{m.hasEmail ? "\u2705" : "\u274C"}</Td>
                        <Td align="center">{m.hasIban ? "\u2705" : "\u274C"}</Td>
                        <Td align="center">
                          {m.hasDateOfBirth ? "\u2705" : "\u274C"}
                        </Td>
                        <Td>
                          {(() => {
                            if (!m.internalNote) return <span style={{ color: "var(--color-muted)" }}>Nie</span>;
                            const match = m.internalNote.match(/(\d{2}\.\d{2}\.\d{4})/);
                            const timeMatch = m.internalNote.match(/(\d{2}:\d{2})/);
                            if (!match) return <span style={{ color: "var(--color-muted)" }}>Nie</span>;
                            return (
                              <span style={{ fontSize: "0.82rem", color: "#16a34a", fontWeight: 600 }}>
                                {match[1]}
                                {timeMatch && <span style={{ fontWeight: 400, marginLeft: "0.3rem" }}>{timeMatch[1]}</span>}
                              </span>
                            );
                          })()}
                        </Td>
                      </tr>
                    ))}
                    {sortedMembers.length === 0 && (
                      <tr>
                        <Td
                          colSpan={10}
                          style={{
                            textAlign: "center",
                            color: "var(--color-muted)",
                            padding: "2rem",
                          }}
                        >
                          Keine Mitglieder in dieser Kategorie.
                        </Td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "0.8rem",
                  color: "var(--color-muted)",
                }}
              >
                Stand:{" "}
                {new Date().toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </>
          )}
        </div>
      </main>
    </SubpageShell>
  );
}

/* ---- Helper components ---- */

function StatCard({
  label,
  value,
  color,
  active,
  onClick,
}: {
  label: string;
  value: number;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="card"
      style={{
        padding: "1rem 1.25rem",
        cursor: "pointer",
        border: active ? `2px solid ${color}` : "1px solid var(--color-border)",
        background: active ? `${color}0D` : "var(--color-surface)",
        textAlign: "left",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        style={{
          fontSize: "1.75rem",
          fontWeight: 700,
          color,
          lineHeight: 1,
          marginBottom: "0.25rem",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "var(--color-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
    </button>
  );
}

function Th({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <th
      style={{
        padding: "0.65rem 0.75rem",
        textAlign: align || "left",
        fontSize: "0.75rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "var(--color-muted)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align,
  colSpan,
  style,
}: {
  children: React.ReactNode;
  align?: "center" | "left";
  colSpan?: number;
  style?: React.CSSProperties;
}) {
  return (
    <td
      colSpan={colSpan}
      style={{
        padding: "0.55rem 0.75rem",
        textAlign: align || "left",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </td>
  );
}
