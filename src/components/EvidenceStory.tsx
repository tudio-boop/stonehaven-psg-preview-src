import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EVIDENCE, type EvidenceStory } from "../data/content";
import "./EvidenceStory.css";

function Story({ story }: { story: EvidenceStory }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`evidence ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="evidence__trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="evidence__result">
          <p className="mono-note">{story.resultLabel}</p>
          <p className="evidence__value">{story.resultValue}</p>
          <p className="evidence__note">{story.resultNote}</p>
        </div>
        <div className="evidence__meta">
          <p className="mono-note">{story.client}</p>
          <h3>{story.title}</h3>
          <span className="evidence__cta mono-note">{open ? "Close" : "Open case"}</span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="evidence__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="evidence__flow">
              <div>
                <p className="mono-note">The objective</p>
                <p>{story.objective}</p>
              </div>
              <div className="evidence__arrow" aria-hidden="true">
                ↓
              </div>
              <div>
                <p className="mono-note">The insight</p>
                <p>{story.insight}</p>
              </div>
              <div className="evidence__arrow" aria-hidden="true">
                ↓
              </div>
              <div>
                <p className="mono-note">The move</p>
                <p>{story.move}</p>
              </div>
              <div className="evidence__arrow" aria-hidden="true">
                ↓
              </div>
              <div>
                <p className="mono-note">The result</p>
                <p>
                  <strong>{story.resultValue}</strong> — {story.resultNote}
                </p>
                {story.receipt ? <p className="evidence__receipt mono-note">Source: {story.receipt}</p> : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

export function Proof() {
  return (
    <section className="chapter proof invert" id="proof" aria-labelledby="proof-heading">
      <div className="chapter-inner">
        <p className="eyebrow">Proof</p>
        <h2 id="proof-heading" className="display proof__title">
          EVIDENCE,
          <br />
          NOT THEATRE.
        </h2>
        <p className="lede proof__lede">
          Only documented Stonehaven work. No invented metrics. Expand a case for objective → insight →
          move → result.
        </p>
        <div className="proof__list">
          {EVIDENCE.map((story) => (
            <Story key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
