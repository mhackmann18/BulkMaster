import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "./ChangeTheme.css";

export default function ChangeTheme() {
  const [colorScheme, setColorScheme] = useState("light");

  if (colorScheme === "dark") {
    document.querySelector("body").classList.add("dark-mode");
  } else {
    document.querySelector("body").classList.remove("dark-mode");
  }

  return (
    <button
      id="toggle-theme"
      title={
        colorScheme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
    >
      {colorScheme === "light" && (
        <FontAwesomeIcon icon={faMoon} id="moon-icon" />
      )}
      {colorScheme === "dark" && <FontAwesomeIcon icon={faSun} id="sun-icon" />}
    </button>
  );
}
