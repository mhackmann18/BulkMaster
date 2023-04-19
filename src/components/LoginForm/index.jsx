import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { validateUserCredentials } from "../../utils/user";
import "../SignupForm/account-form.css";

export default function LoginForm() {
  const [formSubmitError, setFormSubmitError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setFormSubmitError("");
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      setFormSubmitError("Please fill in all fields");
    } else if (!(await validateUserCredentials(username, password))) {
      setFormSubmitError("No account found with that username and password");
    } else {
      console.log("Login user");
    }
  }

  return (
    <form id="login-form" className="account-form" onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <p id="login-msg">
        Don&apos;t have an account yet? <Link to="/signup">Sign Up</Link>
      </p>
      <label htmlFor="username">Username</label>
      <input name="username" id="username" type="text" />
      <label htmlFor="password">Password</label>
      <input name="password" id="password" type="text" />
      <button type="submit" className="btn-default bg-eerie-black">
        Log in
      </button>
      {formSubmitError && (
        <Alert id="login-form-error" severity="error">
          {formSubmitError}
        </Alert>
      )}
    </form>
  );
}
