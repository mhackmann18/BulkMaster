import { useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import Button from "../common/Button";
import { checkUsernameInput } from "../../utils/validation";
import "./ChangeSettingForm.css";

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
    <form className="settings-change-form" onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="username">New Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={oldUsername}
        />
      </div>
      {inputError && (
        <Alert className="settings-change-error" severity="error">
          {inputError}
        </Alert>
      )}
      <div className="row buttons">
        <Button text="Cancel" handleClick={onCancel} variant="btn-no-bg" />
        <Button text="Save" type="submit" variant="btn-default" />
      </div>
    </form>
  );
}

ChangeUsernameForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
