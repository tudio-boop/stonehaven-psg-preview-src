import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import "./Difference.css";
gsap.registerPlugin(ScrollTrigger);
export function Difference() {
const reduced = usePrefersReducedMotion();
const rootRef = useRef<HTMLElement>(null);
useEffect(() => {
const root = rootRef.current;
if (!root || reduced) return;
const ctx = gsap.context(() => {
gsap.fromTo(
"[data-diff-line]",
{ y: 40, opacity: 0 },
{
y: 0,
opacity: 1,
stagger: 0.12,
ease: "power3.out",
scrollTrigger: {
trigger: root,
start: "top 70%",
end: "top 25%",
scrub: 0.4,
},
},
);
gsap.fromTo(
".difference__shatter span",
{ x: 0, y: 0, opacity: 1, rotate: 0 },
{
x: (i) => (i % 2 === 0 ? -40 : 48) * (1 + (i % 3) * 0.2),
y: (i) => ((i * 17) % 60) - 20,
rotate: (i) => (i % 2 === 0 ? -18 : 22),
opacity: 0,
ease: "power2.in",
scrollTrigger: {
trigger: root,
start: "top 55%",
end: "top 10%",
scrub: true,
},
},
);
}, root);
return () => ctx.revert();
}, [reduced]);
return (
<section className="chapter difference" id="difference" ref={rootRef} aria-labelledby="diff-heading">
<div className="chapter-inner">
<p className="eyebrow">The difference</p>
<div className="difference__shatter" aria-hidden="true">
{"PERSONA BOX".split("").map((ch, i) => (
<span key={i}>{ch === " " ? "\u00A0" : ch}</span>
))}
</div>
<div className="difference__swap">
<p className="mono-note" data-diff-line>
From
</p>
<p className="difference__old" data-diff-line>
WHO FITS THE DESCRIPTION?
</p>
<div className="difference__rule" data-diff-line aria-hidden="true" />
<p className="mono-note" data-diff-line>
To
</p>
<h2 id="diff-heading" className="display difference__new" data-diff-line>
WHAT MAKES SOMEONE ACT?
</h2>
</div>
<p className="lede difference__support" data-diff-line>
TURN ATTENTION INTO ACTION BY DESIGN.
</p>
</div>
</section>
);
}
