import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { METHOD_STEPS } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./OutcomePipeline.css";

gsap.registerPlugin(ScrollTrigger);

export function OutcomePipeline() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".pipeline__step", { opacity: 1, y: 0 });
        gsap.set(".pipeline__progress", { scaleY: 1 });
        return;
      }

      gsap.set(".pipeline__step", { opacity: 0.18, y: 28 });
      gsap.set(".pipeline__progress", { scaleY: 0, transformOrigin: "top center" });

      gsap.to(".pipeline__progress", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 0.5,
        },
      });

      gsap.utils.toArray<HTMLElement>(".pipeline__step").forEach((step) => {
        gsap.to(step, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            end: "top 45%",
            scrub: 0.4,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="chapter pipeline" id="method" ref={rootRef} aria-labelledby="method-heading">
      <div className="chapter-inner">
        <p className="eyebrow">The method</p>
        <h2 id="method-heading" className="display pipeline__title">
          WORK BACKWARDS
          <br />
          FROM THE OUTCOME.
        </h2>

        <div className="pipeline__track">
          <div className="pipeline__line" aria-hidden="true">
            <div className="pipeline__progress" />
          </div>
          <ol className="pipeline__list">
            {METHOD_STEPS.map((step, i) => (
              <li className="pipeline__step" key={step.id}>
                <div className="pipeline__node" aria-hidden="true">
                  <span />
                </div>
                <div className="pipeline__content">
                  <p className="mono-note">
                    {step.id} / {step.title}
                  </p>
                  <p className="pipeline__q">{step.question}</p>
                </div>
                {i < METHOD_STEPS.length - 1 ? (
                  <div className="pipeline__arrow" aria-hidden="true">
                    \u2193
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
