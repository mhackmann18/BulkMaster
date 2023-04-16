import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("");

  return (
    <header id="navbar">
      <Link id="navbar-logo" to="" onClick={() => setActiveLink("")}>
        PREPMASTER
      </Link>
      <ul>
        <li>
          <Link
            to="about"
            className={activeLink === "about" ? "active" : ""}
            onClick={() => setActiveLink("about")}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="signup"
            className={activeLink === "signup" ? "active" : ""}
            onClick={() => setActiveLink("signup")}
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            to="login"
            className={activeLink === "login" ? "active" : ""}
            onClick={() => setActiveLink("login")}
          >
            Log In
          </Link>
        </li>
      </ul>
    </header>
  );
}
