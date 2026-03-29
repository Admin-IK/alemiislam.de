"use client";

import { useEffect, useState } from "react";
import type { PrayerSlot } from "@/lib/prayerTimes/parse";
import { PrayerSlotIcon } from "./PrayerSlotIcon";
import { useLocale } from "./LocaleProvider";

const ORDER: PrayerSlot[] = [
  "imsak",
  "gunes",
  "ogle",
  "ikindi",
  "aksam",
  "yatsi",
];

type ApiOk = {
  ok: true;
  date: string;
  times: Record<PrayerSlot, string>;
  rawDate?: string;
};

function TickerSegment({
  data,
  t,
}: {
  data: ApiOk;
  t: (path: string, vars?: Record<string, string>) => string;
}) {
  return (
    <div className="prayer-ticker-segment">
      {ORDER.map((slot) => (
        <span key={slot} className="prayer-ticker-item">
          <span className="prayer-ticker-icon" aria-hidden>
            <PrayerSlotIcon slot={slot} />
          </span>
          <span className="prayer-ticker-name">{t(`prayer.ticker.${slot}`)}</span>
          <span className="prayer-ticker-time">{data.times[slot]}</span>
        </span>
      ))}
      <span className="prayer-ticker-dot" aria-hidden>
        ◆
      </span>
    </div>
  );
}

export function PrayerTimesSection() {
  const { locale, t } = useLocale();
  const [state, setState] = useState<"loading" | "ok" | "err">("loading");
  const [data, setData] = useState<ApiOk | null>(null);

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    setData(null);

    const q = new URLSearchParams({
      locale: locale === "tr" ? "tr" : "de",
    });

    fetch(`/api/prayer-times?${q.toString()}`)
      .then(async (res) => {
        const json: unknown = await res.json();
        if (!res.ok || !json || typeof json !== "object") {
          throw new Error("bad response");
        }
        const o = json as Record<string, unknown>;
        if (o.ok !== true || !o.times || typeof o.times !== "object") {
          throw new Error("invalid payload");
        }
        return json as ApiOk;
      })
      .then((payload) => {
        if (!cancelled) {
          setData(payload);
          setState("ok");
        }
      })
      .catch(() => {
        if (!cancelled) setState("err");
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const prayerSourceNote = t("prayer.sourceNote");

  return (
    <section
      className="prayer-section"
      aria-labelledby="prayer-heading"
      id="gebetszeiten"
    >
      <div className="container prayer-band">
        <div className="prayer-band-meta">
          <h2 id="prayer-heading" className="prayer-band-title">
            {t("prayer.title")}
          </h2>
          {state === "ok" && data?.date && (
            <span className="prayer-band-date">{data.date}</span>
          )}
          {state === "loading" && (
            <span className="prayer-band-date prayer-band-date--muted">
              {t("prayer.loading")}
            </span>
          )}
          {state === "err" && (
            <span className="prayer-band-date prayer-band-date--warn" role="alert">
              {t("prayer.error")}
            </span>
          )}
        </div>

        {state === "ok" && data && (
          <>
            <ul className="sr-only">
              {ORDER.map((slot) => (
                <li key={slot}>
                  {t(`prayer.${slot}`)}: {data.times[slot]}
                </li>
              ))}
            </ul>
            <div
              className="prayer-ticker-shell"
              aria-hidden="true"
            >
              <div className="prayer-ticker-fade" />
              <div className="prayer-ticker">
                <div className="prayer-ticker-track">
                  <TickerSegment data={data} t={t} />
                  <TickerSegment data={data} t={t} />
                </div>
              </div>
            </div>
          </>
        )}

        {state !== "ok" && (
          <div className="prayer-ticker-placeholder" />
        )}

        {prayerSourceNote.trim() ? (
          <p className="prayer-band-source">{prayerSourceNote}</p>
        ) : null}
      </div>
    </section>
  );
}
