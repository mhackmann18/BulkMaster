import { useState } from "react";
import SettingsListItem from "./SettingsListItem";
import ChangeUsernameForm from "./ChangeUsernameForm";
import useUser from "../../hooks/useUser";

export default function Username() {
  const [editing, setEditing] = useState(false);
  const {
    user: { username },
  } = useUser();

  return (
    <SettingsListItem headerText="Username">
      {editing ? (
        <ChangeUsernameForm
          onCancel={() => setEditing(false)}
          onSubmit={() => setEditing(false)}
        />
      ) : (
        <div className="settings-list-item-content">
          <span>{username}</span>
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
