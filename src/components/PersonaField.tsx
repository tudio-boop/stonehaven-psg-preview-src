import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./PersonaField.css";

gsap.registerPlugin(ScrollTrigger);

type Point = {
  x: number;
  y: number;
  inBox: boolean;
  demand: boolean;
  glyph: string;
};

const GLYPHS = ["·", "◦", "＋", "人", "个", "・"];

function makePoints(count: number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < count; i += 1) {
    const x = 4 + Math.random() * 92;
    const y = 8 + Math.random() * 84;
    const inBox = x > 28 && x < 58 && y > 28 && y < 68;
    const demand = Math.random() > (inBox ? 0.35 : 0.55);
    pts.push({
      x,
      y,
      inBox,
      demand,
      glyph: GLYPHS[i % GLYPHS.length],
    });
  }
  return pts;
}

export function PersonaField() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const points = useMemo(() => makePoints(140), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set("[data-demand]", { opacity: 1, scale: 1 });
        gsap.set(boxRef.current, { opacity: 0.35, scale: 0.96 });
        if (labelRef.current) labelRef.current.textContent = "PERSONA ≠ DEMAND";
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 60%",
          end: "bottom 35%",
          scrub: 0.65,
        },
      });

      tl.fromTo(
        boxRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1 },
        0,
      );
      tl.fromTo(
        "[data-point]",
        { opacity: 0.15, scale: 0.6 },
        { opacity: 0.55, scale: 1, stagger: 0.002, duration: 0.8 },
        0.1,
      );
      tl.to("[data-in='1']", { opacity: 1, color: "#fff", duration: 0.6 }, 0.55);
      tl.to("[data-in='0']", { opacity: 0.22, duration: 0.6 }, 0.55);
      tl.fromTo(
        "[data-demand]",
        { scale: 1, opacity: 0.4 },
        { scale: 1.35, opacity: 1, duration: 0.8, stagger: 0.01 },
        1.1,
      );
      tl.to(
        boxRef.current,
        {
          opacity: 0.25,
          scaleX: 1.15,
          scaleY: 0.82,
          rotate: -4,
          borderRadius: "42% 18% 48% 22%",
          duration: 1,
        },
        1.4,
      );
      tl.to(
        labelRef.current,
        {
          duration: 0.01,
          onStart: () => {
            if (labelRef.current) labelRef.current.textContent = "PERSONA ≠ DEMAND";
          },
        },
        1.55,
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="chapter problem" id="problem" ref={rootRef} aria-labelledby="problem-heading">
      <div className="chapter-inner problem__grid">
        <div className="problem__copy">
          <p className="eyebrow">The problem</p>
          <h2 id="problem-heading" className="display problem__title">
            FORCING A PERSONA
            <br />
            MISSES REAL DEMAND.
          </h2>
          <p className="lede">Real demand doesn’t fit textbook boxes.</p>
          <p className="problem__body">
            Marketing fails when rigid personas box people out and miss real demand.
          </p>
        </div>

        <div className="persona-field" role="img" aria-label="Interactive field of audience signals with a persona box that fails to capture demand">
          <div className="persona-field__box" ref={boxRef}>
            <span>Persona box</span>
          </div>
          {points.map((p, i) => (
            <span
              key={i}
              className={`persona-field__pt ${p.demand ? "is-demand" : ""}`}
              data-point
              data-in={p.inBox ? "1" : "0"}
              data-demand={p.demand ? "" : undefined}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {p.glyph}
            </span>
          ))}
          <p className="persona-field__label mono-note" ref={labelRef}>
            WHO FITS THE DESCRIPTION?
          </p>
        </div>
      </div>
    </section>
  );
}
