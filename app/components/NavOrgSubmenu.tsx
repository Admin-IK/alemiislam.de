"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useLocale } from "./LocaleProvider";

const ITEMS = [
  { href: "/bildung", labelKey: "org.bildung" as const },
  { href: "/jugend", labelKey: "org.jugend" as const },
  { href: "/frauen", labelKey: "org.frauen" as const },
  { href: "/frauen-jugend", labelKey: "org.frauenJugend" as const },
];

export function NavOrgSubmenu() {
  const { t } = useLocale();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const panelVisible = open || (desktop && hoverOpen);

  const close = useCallback(() => {
    setOpen(false);
    setHoverOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  useEffect(() => {
    if (!panelVisible) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [panelVisible, close]);

  return (
    <div
      ref={rootRef}
      className="nav-dropdown"
      onMouseEnter={() => desktop && setHoverOpen(true)}
      onMouseLeave={() => desktop && setHoverOpen(false)}
    >
      <button
        type="button"
        className="nav-dropdown-trigger"
        aria-expanded={panelVisible}
        aria-haspopup="true"
        aria-controls={panelId}
        id={`${panelId}-btn`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        {t("nav.orgMenu")}
        <span className="nav-dropdown-chevron" aria-hidden>
          ▾
        </span>
      </button>
      <ul
        id={panelId}
        className={`nav-dropdown-panel${panelVisible ? " is-open" : ""}`}
        role="menu"
        aria-labelledby={`${panelId}-btn`}
        aria-hidden={!panelVisible}
      >
        {ITEMS.map(({ href, labelKey }) => (
          <li key={href} role="none">
            <Link
              href={href}
              role="menuitem"
              className="nav-dropdown-link"
              tabIndex={panelVisible ? 0 : -1}
              onClick={close}
            >
              {t(labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
