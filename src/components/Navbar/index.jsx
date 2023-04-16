import { Link, useLocation } from "react-router-dom";
import "./index.css";

export default function Navbar() {
  const currentPath = useLocation().pathname;

  return (
    <header id="navbar">
      <Link id="navbar-logo" to="">
        PREPMASTER
      </Link>
      <ul>
        <li>
          <Link to="about" className={currentPath === "/about" ? "active" : ""}>
            About
          </Link>
        </li>
        <li>
          <Link
            to="signup"
            className={currentPath === "/signup" ? "active" : ""}
          >
            Sign up
          </Link>
        </li>
        <li>
          <Link to="login" className={currentPath === "/login" ? "active" : ""}>
            Log in
          </Link>
        </li>
      </ul>
    </header>
  );
}
