import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import UserController from "../../controllers/User";
import useUser from "../../hooks/useUser";
// import useToken from "../../hooks/useToken";
import "../SignupForm/account-form.css";

export default function LoginForm() {
  const [formSubmitError, setFormSubmitError] = useState("");
  // const { setToken } = useToken();
  const { setUser } = useUser();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setFormSubmitError("");
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      setFormSubmitError("Please fill in all fields");
    } else {
      const user = await UserController.login({ username, password });

      console.log(user);

      // const { token } = user;

      delete user.password;

      if (!user.token) {
        setFormSubmitError(user.message || "An unexpected error occurred");
      } else {
        setUser({ ...user });
        navigate(`/dashboard`);
      }
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
        <Alert id="account-form-submit-error" severity="error">
          {formSubmitError}
        </Alert>
      )}
    </form>
  );
}
