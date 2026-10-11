export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="loader__spinner" />
        <p className="loader__text">Parsing your resume…</p>
      </div>
    </div>
  );
}
