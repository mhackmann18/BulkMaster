import { Link } from "react-router-dom";
import "./index.css";

export default function Navbar() {
  return (
    <header id="main-nav">
      <h1>PREPMASTER</h1>
      <ul>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="signup">Sign Up</Link>
        </li>
        <li>
          <Link to="login">Log In</Link>
        </li>
      </ul>
    </header>
  );
}
