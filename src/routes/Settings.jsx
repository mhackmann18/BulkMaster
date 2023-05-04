import SettingsList from "../components/SettingsList";
import Button from "../components/common/Button";
import "./Settings.css";

export default function Settings() {
  return (
    <div id="settings-page">
      <div id="settings">
        <h1 id="page-heading">Settings</h1>
        <SettingsList />
        <div className="buttons-container">
          <Button
            text="Sign Out"
            handleClick={() => {}}
            variant="default wide"
          />
          <Button
            text="Delete Account"
            handleClick={() => {}}
            variant="default wide"
          />
        </div>
      </div>
    </div>
  );
}
