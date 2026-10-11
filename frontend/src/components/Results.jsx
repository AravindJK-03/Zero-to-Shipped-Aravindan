import { useEffect, useState } from "react";

const CIRCUMFERENCE = 2 * Math.PI * 62; // r = 62

function verdictFor(score) {
  if (score >= 80) return { text: "🎉 Excellent Match!", color: "#00cec9" };
  if (score >= 60) return { text: "👍 Good Match — Room to Improve", color: "#feca57" };
  return { text: "⚠️ Needs Improvement", color: "#ff6b6b" };
}

export default function Results({ result, onReset }) {
  const [displayed, setDisplayed] = useState(0);
  const [ringOffset, setRingOffset] = useState(CIRCUMFERENCE);

  useEffect(() => {
    // Trigger the score-ring stroke transition
    setRingOffset(CIRCUMFERENCE - (result.score / 100) * CIRCUMFERENCE);

    // Animate the score counter (ease-out quad)
    const start = performance.now();
    const duration = 1200;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      setDisplayed(Math.round(result.score * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    const rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [result]);

  const verdict = verdictFor(result.score);

  return (
    <section className="results" id="results">
      <h2 className="section-title">Your Results</h2>

      {/* Score Ring */}
      <div className="score-wrapper">
        <div
          className="score-ring"
          role="progressbar"
          aria-valuenow={result.score}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <svg viewBox="0 0 140 140">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6c5ce7" />
                <stop offset="100%" stopColor="#00cec9" />
              </linearGradient>
            </defs>
            <circle className="score-ring__bg" cx="70" cy="70" r="62" />
            <circle
              className="score-ring__fill"
              cx="70" cy="70" r="62"
              style={{ strokeDashoffset: ringOffset }}
            />
          </svg>
          <div className="score-ring__label">
            <span className="score-ring__value">{displayed}</span>
            <span className="score-ring__unit">/ 100</span>
          </div>
        </div>
        <p className="score-verdict" style={{ color: verdict.color }}>
          {verdict.text}
        </p>
      </div>

      {/* Skills Columns */}
      <div className="skills-grid">
        <div className="skills-card skills-card--present">
          <h3 className="skills-card__heading">
            <span className="skills-card__icon">✅</span> Skills Present
          </h3>
          <ul className="skills-list">
            {result.presentSkills.map((skill, i) => (
              <li key={skill} style={{ animationDelay: `${i * 0.06}s` }}>
                <span className="skill-tag skill-tag--present">✓</span> {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="skills-card skills-card--missing">
          <h3 className="skills-card__heading">
            <span className="skills-card__icon">❌</span> Skills Missing
          </h3>
          <ul className="skills-list">
            {result.missingSkills.map((skill, i) => (
              <li key={skill} style={{ animationDelay: `${i * 0.06}s` }}>
                <span className="skill-tag skill-tag--missing">✗</span> {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className="btn btn--secondary" onClick={onReset}>
        ↩ Upload Another Resume
      </button>
    </section>
  );
}
