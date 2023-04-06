import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./ToggleTheme.css";

export default function ToggleTheme() {
  const [colorScheme, setColorScheme] = useState("light");

  if (colorScheme === "dark") {
    document.querySelector("body").classList.add("dark-mode");
  } else {
    document.querySelector("body").classList.remove("dark-mode");
  }

  const style1 = {
    cursor: "pointer",
    left: 42,
  };
  const style2 = {
    cursor: "pointer",
    left: 2,
  };

  return (
    <div>
      <div
        title="toggle theme"
        id="theme-toggle"
        onClick={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      >
        <FontAwesomeIcon icon={faSun} className="icon sun" />
        <div
          className="round-slider"
          style={colorScheme === "light" ? style1 : style2}
        ></div>
        <FontAwesomeIcon icon={faMoon} className="icon moon" />
      </div>
    </div>
  );
}
