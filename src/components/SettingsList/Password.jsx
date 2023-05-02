import { useState } from "react";
import SettingsListItem from "./SettingsListItem";
import ChangePasswordForm from "./ChangePasswordForm";

export default function Password() {
  const [editing, setEditing] = useState(false);

  return (
    <SettingsListItem headerText="Password">
      {editing ? (
        <ChangePasswordForm
          onCancel={() => setEditing(false)}
          onSuccessfulSubmit={() => setEditing(false)}
        />
      ) : (
        <div className="settings-list-item-content">
          <span>. . . . . . . .</span>
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
