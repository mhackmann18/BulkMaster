import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Alert from "@mui/material/Alert";
import theme from "../../theme";
import "./account-form.css";

export default function SignupForm() {
  const [usernameInputError, setUsernameInputError] = useState("");
  const [passwordInputError, setPasswordInputError] = useState("");
  const [confirmPasswordInputError, setConfirmPasswordInputError] =
    useState("");

  function handleUsernameInputBlur(e) {
    const [isValid, msg] = checkUsernameInput(e.target.value);

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
    console.log(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;
    let isValid = true;

    const [usernameIsValid, usernameErrMsg] = checkUsernameInput(username);
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
      setConfirmPasswordInputError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordInputError("");
    }

    if (isValid) console.log("Create new account");
  }

  return (
    <form id="signup-form" className="account-form" onSubmit={handleSubmit}>
      <h2>Create an account</h2>
      <p id="signup-msg">
        Import your favorite recipes. Create your own recipes. Save it all in
        one place. Already have an account? <Link to="/login">Log in</Link>
      </p>
      <label htmlFor="username">Username</label>
      <input
        name="username"
        id="username"
        type="text"
        onBlur={handleUsernameInputBlur}
      />
      <ThemeProvider theme={theme}>
        {usernameInputError && (
          <Alert severity="error">{usernameInputError}</Alert>
        )}
      </ThemeProvider>
      <label htmlFor="password">Password</label>
      <input
        name="password"
        id="password"
        type="password"
        onBlur={handlePasswordInputBlur}
      />
      <ThemeProvider theme={theme}>
        {passwordInputError && (
          <Alert severity="error">{passwordInputError}</Alert>
        )}
      </ThemeProvider>
      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        name="confirm-password"
        id="confirm-password"
        type="password"
        onBlur={handleConfirmPasswordInputBlur}
      />
      <ThemeProvider theme={theme}>
        {confirmPasswordInputError && (
          <Alert severity="error">{confirmPasswordInputError}</Alert>
        )}
      </ThemeProvider>
      <button type="submit" className="btn-default bg-eerie-black">
        Sign up
      </button>
    </form>
  );
}

function checkUsernameInput(username) {
  let isValid = false;
  let msg = "";

  if (username.length < 8) {
    msg = "Username must be at least 8 characters long";
  } else {
    isValid = true;
  }

  return [isValid, msg];
}

function checkPasswordInput(password) {
  let isValid = false;
  let msg = "";

  if (password.length < 8) {
    msg = "Password must be at least 8 characters long";
  } else {
    isValid = true;
  }

  return [isValid, msg];
}
