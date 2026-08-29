import "./WhyItWorks.css";

export function WhyItWorks() {
  return (
    <section className="chapter why-works" id="why-it-works" aria-labelledby="system-heading">
      <div className="chapter-inner why-works__grid">
        <div>
          <p className="eyebrow">Why it works</p>
          <h2 id="system-heading" className="display why-works__title">
            THERE’S A SYSTEM
            <br />
            BEHIND THE STRATEGY.
          </h2>
        </div>
        <div className="why-works__copy">
          <p>
            Stonehaven’s methodology comes from ongoing work in audience understanding, decision-making,
            behavioural modelling, and strategy — so “why care?” isn’t guessed campaign by campaign.
          </p>
          <p>
            The sophistication lives in how outcomes are reverse-engineered. The research layer sits on a
            separate site.
          </p>
          <a className="why-works__link" href="https://stonehavenentertainment.com/research">
            EXPLORE THE RESEARCH →
          </a>
        </div>
      </div>
    </section>
  );
}
