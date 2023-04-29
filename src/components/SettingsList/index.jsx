import { useState } from "react";
import ToggleTheme from "../common/ToggleTheme";
import "./index.css";

export default function SettingsList() {
  const [theme, setTheme] = useState("light");

  return (
    <ul id="settings-list">
      <li className="settings-list-item">
        <h4>Theme</h4>
        <div className="settings-list-item-content">
          <span>{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</span>
          <ToggleTheme variant="small" onChange={(value) => setTheme(value)} />
        </div>
      </li>
      <li className="settings-list-item">
        <h4>Username</h4>
        <div className="settings-list-item-content">
          <span>johndoe18</span>
          <button type="button">Change</button>
        </div>
      </li>
      <li className="settings-list-item">
        <h4>Password</h4>
        <div className="settings-list-item-content">
          <span>. . . . . . .</span>
          <button type="button">Change</button>
        </div>
      </li>
      <li className="settings-list-item">
        <button type="button" className="btn-default">
          Sign Out
        </button>
      </li>
      <li className="settings-list-item">
        <button type="button" className="btn-default">
          Delete Account
        </button>
      </li>
    </ul>
  );
}
