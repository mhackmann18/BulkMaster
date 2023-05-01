import SettingsListItem from "./SettingsListItem";

export default function Password() {
  return (
    <SettingsListItem headerText="Password">
      <div className="settings-list-item-content">
        <span>. . . . . . . .</span>
        <button className="btn-link" type="button">
          Change
        </button>
      </div>
    </SettingsListItem>
  );
}
