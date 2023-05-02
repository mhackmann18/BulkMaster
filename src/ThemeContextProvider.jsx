import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext("light");

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
