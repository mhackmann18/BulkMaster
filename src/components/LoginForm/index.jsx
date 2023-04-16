import { Link } from "react-router-dom";
import "../SignupForm/account-form.css";

export default function LoginForm() {
  return (
    <form id="login-form" className="account-form">
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
    </form>
  );
}
