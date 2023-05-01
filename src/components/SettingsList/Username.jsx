import SettingsListItem from "./SettingsListItem";

export default function Username() {
  return (
    <SettingsListItem headerText="Username">
      <div className="settings-list-item-content">
        <span>johndoe18</span>
        <button className="btn-link" type="button">
          Change
        </button>
      </div>
    </SettingsListItem>
  );
}
