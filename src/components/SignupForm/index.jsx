import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { checkUsernameInput, checkPasswordInput } from "../../utils/validation";
import "./account-form.css";

export default function SignupForm() {
  const [usernameInputError, setUsernameInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [confirmPasswordInputError, setConfirmPasswordInputError] =
    useState("");
  const [formSubmitError, setFormSubmitError] = useState("");

  async function handleUsernameInputBlur(e) {
    const [isValid, msg] = await checkUsernameInput(e.target.value);

    if (!isValid) {
      setUsernameInputError(msg);
    } else {
      setUsernameInputError("");
    }
  }

  function handlePasswordInputBlur(e) {
    const [isValid, msg] = checkPasswordInput(e.target.value);

    if (!isValid) {
      setPasswordInputError(msg);
    } else {
      setPasswordInputError("");
    }
  }

  function handleConfirmPasswordInputBlur(e) {
    const passwordInputValue = e.target.parentElement.password.value;
    const confirmPasswordInputValue = e.target.value;

    if (passwordInputValue !== confirmPasswordInputValue) {
      setConfirmPasswordInputError("Passwords don't match");
    } else {
      setConfirmPasswordInputError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;

    if (!username || !password || !confirmPassword) {
      setFormSubmitError("Please fill in all fields");
      return false;
    }

    setFormSubmitError("");

    let isValid = true;

    const [usernameIsValid, usernameErrMsg] = await checkUsernameInput(
      username
    );
    const [passwordIsValid, passwordErrMsg] = checkPasswordInput(password);

    if (!usernameIsValid) {
      setUsernameInputError(usernameErrMsg);
      isValid = false;
    } else {
      setUsernameInputError("");
    }

    if (!passwordIsValid) {
      setPasswordInputError(passwordErrMsg);
      isValid = false;
    } else {
      setPasswordInputError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordInputError("Passwords don't match");
      isValid = false;
    } else {
      setConfirmPasswordInputError("");
    }

    if (isValid) console.log("Create new account");
  }

  return (
    <form id="signup-form" className="account-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <p id="signup-msg">
        Import and customize your favorite recipes. Create your own recipes.
        Save it all in one place. Already have an account?{" "}
        <Link to="/login">Log in</Link>
      </p>
      <label htmlFor="username">Username</label>
      <input
        name="username"
        id="username"
        type="text"
        onBlur={handleUsernameInputBlur}
      />
      {usernameInputError && (
        <Alert severity="error">{usernameInputError}</Alert>
      )}
      <label htmlFor="password">Password</label>
      <input
        name="password"
        id="password"
        type="password"
        onBlur={handlePasswordInputBlur}
      />
      {passwordInputError && (
        <Alert severity="error">{passwordInputError}</Alert>
      )}
      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        name="confirm-password"
        id="confirm-password"
        type="password"
        onBlur={handleConfirmPasswordInputBlur}
      />
      {confirmPasswordInputError && (
        <Alert severity="error">{confirmPasswordInputError}</Alert>
      )}
      <button type="submit" className="btn-default bg-eerie-black">
        Sign up
      </button>
      {formSubmitError && (
        <Alert id="account-form-submit-error" severity="error">
          {formSubmitError}
        </Alert>
      )}
    </form>
  );
}
