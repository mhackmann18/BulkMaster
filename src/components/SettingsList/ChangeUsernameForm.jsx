import { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import Button from "../common/Button";
import { checkUsernameInput } from "../../utils/validation";
import "./ChangeUsernameForm.css";

export default function ChangeUsernameForm({ onCancel, onSubmit }) {
  const [inputError, setInputError] = useState("");
  // Get username from context here
  const oldUsername = "johndoe18";

  async function handleSubmit(e) {
    e.preventDefault();

    const [isValid, errorMessage] = await checkUsernameInput(
      e.target.username.value
    );

    if (!isValid) {
      setInputError(errorMessage);
    } else {
      setInputError("");
      console.log(`Change username to ${e.target.username.value}`);
      onSubmit();
    }
  }

  return (
    <form id="change-username-form" onSubmit={handleSubmit}>
      <div className="main">
        <input name="username" type="text" defaultValue={oldUsername} />
        <Button
          text="Cancel"
          handleClick={onCancel}
          variant="btn-default btn-small"
        />
        <Button text="Save" type="submit" variant="btn-default btn-small" />
      </div>
      {inputError && (
        <Alert id="change-username-error" severity="error">
          {inputError}
        </Alert>
      )}
    </form>
  );
}

ChangeUsernameForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
