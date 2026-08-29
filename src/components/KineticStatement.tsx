import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { OUTCOME_WORDS } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./KineticStatement.css";
const CYCLE_MS = 3200;
export function KineticStatement() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slotRef = useRef<HTMLSpanElement>(null);
  const current = OUTCOME_WORDS[index];
  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % OUTCOME_WORDS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, paused]);
  useEffect(() => {
    const el = slotRef.current;
    if (!el) return;
    if (reduced) {
      el.textContent = current;
      return;
    }
    const outgoing = el.querySelector<HTMLElement>("[data-word]");
    const next = document.createElement("span");
    next.dataset.word = "true";
    next.className = "kinetic__word";
    next.setAttribute("aria-hidden", "true");
    next.textContent = current;
    if (!outgoing) {
      el.appendChild(next);
      return;
    }
    el.appendChild(next);
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => outgoing.remove(),
    });
    tl.fromTo(
      outgoing,
      { yPercent: 0, rotateX: 0, filter: "blur(0px)", opacity: 1 },
      { yPercent: -110, rotateX: -55, filter: "blur(4px)", opacity: 0, duration: 0.55 },
      0,
    );
    tl.fromTo(
      next,
      { yPercent: 110, rotateX: 55, filter: "blur(4px)", opacity: 0 },
      { yPercent: 0, rotateX: 0, filter: "blur(0px)", opacity: 1, duration: 0.55 },
      0.05,
    );
    return () => {
      tl.kill();
    };
  }, [current, reduced]);
  return (
    <section className="chapter kinetic" id="difference-lead" aria-labelledby="kinetic-heading">
      <div className="chapter-inner">
        <p className="eyebrow">Primary statement</p>
        <h2 id="kinetic-heading" className="kinetic__lockup">
          <span className="kinetic__line">WE DON’T JUST RUN PROMOTIONS,</span>
          <span className="kinetic__line">WE BUILD THE STRATEGY BEHIND</span>
          <span className="kinetic__line kinetic__line--slot">
            <span className="kinetic__fixed">
              WHY PEOPLE SHOULD&nbsp;
            </span>
            <span
              className="kinetic__slot"
              ref={slotRef}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              tabIndex={0}
              aria-live="polite"
              aria-label={`Current outcome: ${current}`}
            />
          </span>
        </h2>
        <p className="kinetic__assist mono-note">Hover to hold the reel</p>
      </div>
    </section>
  );
}
