const FEATURES = [
  {
    icon: "📄",
    title: "PDF Upload",
    text: "Drag & drop or click to upload your resume in PDF format.",
  },
  {
    icon: "📊",
    title: "Instant Score",
    text: "Get a compatibility score out of 100 in seconds.",
  },
  {
    icon: "✅",
    title: "Skill Breakdown",
    text: "See exactly which skills match and which are missing.",
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features__grid">
        {FEATURES.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <div className="feature-card__icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
