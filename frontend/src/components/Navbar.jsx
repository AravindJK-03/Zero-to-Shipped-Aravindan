export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">🚀</span>
        <span className="navbar__title">0 → Shipped</span>
      </div>
      <ul className="navbar__links">
        <li><a href="#features">Features</a></li>
        <li><a href="#upload">Try It</a></li>
      </ul>
    </nav>
  );
}
