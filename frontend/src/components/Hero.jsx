export default function Hero() {
  return (
    <header className="hero" id="hero">
      <div className="hero__content">
        <h1 className="hero__heading">
          Resume <span className="gradient-text">Parser</span>
        </h1>
        <p className="hero__sub">
          Upload your resume. Get an instant score, see which skills you{" "}
          <strong>have</strong> and which ones you're <strong>missing</strong>.
        </p>
        <a href="#upload" className="btn btn--primary">Analyze My Resume</a>
      </div>
      <div className="hero__glow" aria-hidden="true" />
    </header>
  );
}
