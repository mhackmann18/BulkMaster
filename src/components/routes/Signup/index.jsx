import { Link } from "react-router-dom";
import SignupForm from "./Form";
import "./index.css";

export default function Signup() {
  return (
    <div id="signup-page" className="account-page">
      <SignupForm
        headerElement={
          <p id="signup-msg">
            All you need for managing your recipes.
            <br />
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        }
      />
    </div>
  );
}
