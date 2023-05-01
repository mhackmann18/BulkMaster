import { useState } from "react";
import SettingsListItem from "./SettingsListItem";
import ChangeUsernameForm from "./ChangeUsernameForm";

export default function Username() {
  const [editing, setEditing] = useState(false);

  return (
    <SettingsListItem headerText="Username">
      {editing ? (
        <ChangeUsernameForm
          onCancel={() => setEditing(false)}
          onSubmit={() => setEditing(false)}
        />
      ) : (
        <div className="settings-list-item-content">
          <span>johndoe18</span>
          <button
            onClick={() => setEditing(true)}
            className="btn-link"
            type="button"
          >
            Change
          </button>
        </div>
      )}
    </SettingsListItem>
  );
}
