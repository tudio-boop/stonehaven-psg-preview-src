import { useState } from "react";
import type { FormEvent } from "react";
import "./OutcomeInput.css";

export function OutcomeInput() {
  const [outcome, setOutcome] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = outcome.trim();
    if (!text) return;
    const subject = encodeURIComponent("Ask Stonehaven — Outcome");
    const body = encodeURIComponent(`Outcome:\n${text}\n`);
    window.location.href = `mailto:info@stonehavenentertainment.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="chapter outcome" id="start" aria-labelledby="outcome-heading">
      <div className="chapter-inner">
        <p className="eyebrow">Start with the outcome</p>
        <h2 id="outcome-heading" className="display outcome__title">
          WHAT ARE YOU TRYING
          <br />
          TO MAKE HAPPEN?
        </h2>

        <form className="outcome__form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="outcome-field">
            Tell us the outcome
          </label>
          <textarea
            id="outcome-field"
            name="outcome"
            rows={3}
            placeholder="Tell us the outcome."
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            required
          />
          <div className="outcome__actions">
            <button type="submit" className="outcome__submit">
              Begin with this outcome
            </button>
            <a className="outcome__secondary" href="mailto:info@stonehavenentertainment.com">
              START A CONVERSATION →
            </a>
          </div>
          {sent ? (
            <p className="mono-note outcome__confirm" role="status">
              Opening your mail client…
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
