import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "../data/content";
import "./LiquidGlassNavigation.css";

type Props = {
  compact: boolean;
};

export function LiquidGlassNavigation({ compact }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (compact) setOpen(false);
  }, [compact]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`liq-nav ${compact ? "is-compact" : ""} ${open ? "is-open" : ""}`}>
      <div className="liq-nav__glass">
        <a className="liq-nav__brand" href="#promise" onClick={() => setOpen(false)}>
          <span className="liq-nav__mark">STONEHAVEN</span>
          <span className="liq-nav__sub">Entertainment &amp; Promotions</span>
        </a>

        <button
          type="button"
          className="liq-nav__toggle"
          aria-expanded={open}
          aria-controls="stonehaven-nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="liq-nav__bars" aria-hidden="true" />
        </button>

        <nav className="liq-nav__desktop" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={"current" in link && link.current ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="stonehaven-nav-panel"
            className="liq-nav__panel"
            aria-label="Primary"
            initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={"current" in link && link.current ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
