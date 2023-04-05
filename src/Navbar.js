import "./Navbar.css";

export default function Navbar() {
  return (
    <header id="main-nav">
      <h1>
        PREP<span className="slate-gray">MASTER</span>
      </h1>
      <ul>
        <li>About</li>
        <li>Sign Up</li>
        <li>Log In</li>
      </ul>
    </header>
  );
}
