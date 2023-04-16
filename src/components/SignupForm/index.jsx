import { Link } from "react-router-dom";
import "./index.css";

export default function SignupForm() {
  return (
    <form id="signup-form">
      <h2>Create your account</h2>
      <p id="signup-msg">
        Import your favorite recipes. Create your own recipes. Save it all in
        one place. Already have an account? <Link to="/login">Log in</Link>
      </p>
      <label htmlFor="username">Username</label>
      <input name="username" id="username" type="text" />
      <label htmlFor="password">Password</label>
      <input name="password" id="password" type="text" />
      <button type="submit" className="btn-default bg-eerie-black">
        Sign Up
      </button>
    </form>
  );
}
