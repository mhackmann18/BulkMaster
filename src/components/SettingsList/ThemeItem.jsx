import { useState } from "react";
import ToggleTheme from "../common/ToggleTheme";
import SettingsListItem from "./SettingsListItem";

export default function ThemeItem() {
  const [theme, setTheme] = useState("light");

  return (
    <SettingsListItem headerText="Theme">
      <div className="settings-list-item-content">
        <span>{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</span>
        <ToggleTheme variant="small" onChange={(value) => setTheme(value)} />
      </div>
    </SettingsListItem>
  );
}
