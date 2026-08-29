import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./PromiseHero.css";

gsap.registerPlugin(ScrollTrigger);

export function PromiseHero() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(".promise__statement span", {
        yPercent: (i) => (i + 1) * -12,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".promise__glyph", {
        y: -80,
        rotate: 12,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="chapter promise" id="promise" ref={rootRef} aria-labelledby="promise-heading">
      <div className="chapter-inner promise__inner">
        <p className="eyebrow promise__id">STONEHAVEN / PROMOTIONS, STRATEGY &amp; GROWTH</p>
        <h1 id="promise-heading" className="promise__statement display">
          <span>PROMOTIONS THAT</span>
          <span>MOVE PEOPLE,</span>
          <span>NOT JUST</span>
          <span>IMPRESSIONS.</span>
        </h1>
        <p className="promise__breath mono-note">Scroll to begin with the outcome</p>
        <div className="promise__glyph" aria-hidden="true">
          石
        </div>
      </div>
    </section>
  );
}
