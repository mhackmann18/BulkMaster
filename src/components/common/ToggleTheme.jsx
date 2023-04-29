import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./ToggleTheme.css";

export default function ToggleTheme({ onChange, variant }) {
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
        className={variant}
        onClick={() => {
          setColorScheme(colorScheme === "light" ? "dark" : "light");
          onChange(colorScheme === "light" ? "dark" : "light");
        }}
      >
        <FontAwesomeIcon icon={faSun} className="icon sun" />
        <div
          className="round-slider"
          style={colorScheme === "light" ? style1 : style2}
        />
        <FontAwesomeIcon icon={faMoon} className="icon moon" />
      </div>
    </div>
  );
}

ToggleTheme.propTypes = {
  onChange: PropTypes.func,
  variant: PropTypes.string,
};

ToggleTheme.defaultProps = {
  onChange: () => false,
  variant: "",
};
