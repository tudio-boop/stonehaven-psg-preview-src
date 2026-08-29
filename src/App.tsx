import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiquidGlassNavigation } from "./components/LiquidGlassNavigation";
import { PromiseHero } from "./components/PromiseHero";
import { KineticStatement } from "./components/KineticStatement";
import { PersonaField } from "./components/PersonaField";
import { Difference } from "./components/Difference";
import { OutcomePipeline } from "./components/OutcomePipeline";
import { WhyCareTransformation } from "./components/WhyCareTransformation";
import { Proof } from "./components/EvidenceStory";
import { WhyItWorks } from "./components/WhyItWorks";
import { OutcomeInput } from "./components/OutcomeInput";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import "./App.css";
gsap.registerPlugin(ScrollTrigger);
export default function App() {
const reduced = usePrefersReducedMotion();
const [compactNav, setCompactNav] = useState(false);
useEffect(() => {
const onScroll = () => setCompactNav(window.scrollY > 48);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
return () => window.removeEventListener("scroll", onScroll);
}, []);
useEffect(() => {
if (reduced) return;
const lenis = new Lenis({
duration: 1.1,
smoothWheel: true,
touchMultiplier: 1.1,
});
lenis.on("scroll", ScrollTrigger.update);
const ticker = (time: number) => {
lenis.raf(time * 1000);
};
gsap.ticker.add(ticker);
gsap.ticker.lagSmoothing(0);
return () => {
gsap.ticker.remove(ticker);
lenis.destroy();
};
}, [reduced]);
return (
<div className="site">
<a className="skip-link" href="#promise">
Skip to content
</a>
<LiquidGlassNavigation compact={compactNav} />
<main>
<PromiseHero />
<KineticStatement />
<PersonaField />
<Difference />
<OutcomePipeline />
<WhyCareTransformation />
<Proof />
<WhyItWorks />
<OutcomeInput />
</main>
<footer className="site-footer">
<div className="chapter-inner site-footer__inner">
<div>
<strong>STONEHAVEN</strong>
<p className="mono-note">Promotions, Strategy &amp; Growth</p>
</div>
<p className="mono-note">IDEAS THAT MOVE PEOPLE</p>
</div>
</footer>
</div>
);
}
