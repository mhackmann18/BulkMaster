// import ToggleTheme from "../common/ToggleTheme";
// import SettingsListItem from "./SettingsListItem";
import ThemeItem from "./ThemeItem";
import "./index.css";

export default function SettingsList() {
  return (
    <ul id="settings-list">
      <ThemeItem />
      <li className="settings-list-item">
        <h4>Username</h4>
        <div className="settings-list-item-content">
          <span>johndoe18</span>
          <button className="btn-link" type="button">
            Change
          </button>
        </div>
        <div>
          <input type="text" />
        </div>
      </li>
      <li className="settings-list-item">
        <h4>Password</h4>
        <div className="settings-list-item-content">
          <span>. . . . . . .</span>
          <button className="btn-link" type="button">
            Change
          </button>
        </div>
      </li>
    </ul>
  );
}
