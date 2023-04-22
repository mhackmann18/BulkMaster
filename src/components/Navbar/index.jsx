import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

export default function Navbar() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const currentPath = useLocation().pathname;

  return (
    <header id="navbar">
      <Link id="navbar-logo" to="" onClick={() => setMobileMenuVisible(false)}>
        PREPMASTER
      </Link>
      <ul className={mobileMenuVisible ? "" : "hide"}>
        <li>
          <Link
            to="about"
            className={currentPath === "/about" ? "active" : ""}
            onClick={() => setMobileMenuVisible(false)}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="signup"
            className={currentPath === "/signup" ? "active" : ""}
            onClick={() => setMobileMenuVisible(false)}
          >
            Sign up
          </Link>
        </li>
        <li>
          <Link
            to="login"
            className={currentPath === "/login" ? "active" : ""}
            onClick={() => setMobileMenuVisible(false)}
          >
            Log in
          </Link>
        </li>
      </ul>
      <FontAwesomeIcon
        id="navbar-menu-icon"
        icon={faBars}
        className="viewport-small"
        size="xl"
        onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
      />
    </header>
  );
}
