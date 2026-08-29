import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./WhyCareTransformation.css";

gsap.registerPlugin(ScrollTrigger);

const BEFORE = ["WHY", "SHOULD", "ANYBODY", "CARE?"];

export function WhyCareTransformation() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".why__before", { opacity: 0, visibility: "hidden" });
        gsap.set(".why__after", { opacity: 1, visibility: "visible" });
        return;
      }

      gsap.set(".why__before .why__word", { clearProps: "all" });
      gsap.set(".why__after .why__word", { opacity: 0, y: 48, scale: 0.94 });
      gsap.set(".why__after", { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=170%",
          scrub: 0.55,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Hold the question
      tl.to({}, { duration: 0.7 });
      // Collapse / migrate
      tl.to(".why__before .why__word", {
        y: (i) => (i - 1.5) * -36,
        x: (i) => (i % 2 === 0 ? -48 : 56),
        opacity: 0,
        filter: "blur(10px)",
        rotate: (i) => (i % 2 === 0 ? -10 : 12),
        stagger: 0.06,
        duration: 1,
      });
      // Reconstruct
      tl.to(
        ".why__after .why__word",
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.35",
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="chapter why" id="why-care" ref={rootRef} aria-labelledby="why-heading">
      <div className="chapter-inner why__stage">
        <p className="eyebrow">Why care?</p>
        <div className="why__stack">
          <h2 className="why__before" aria-hidden={reduced ? true : undefined}>
            {BEFORE.map((word) => (
              <span className="why__word" key={word}>
                {word}
              </span>
            ))}
          </h2>
          <h2 id="why-heading" className="why__after">
            <span className="why__word">WE MAKE</span>
            <span className="why__word">“WHY CARE?”</span>
            <span className="why__word">REPEATABLE.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
