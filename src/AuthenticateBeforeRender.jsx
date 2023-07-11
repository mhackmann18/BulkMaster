import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import User from "./utils/UserController";
import useUser from "./hooks/useUser";

export default function AuthenticateBeforeRender({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setUser } = useUser();

  useEffect(() => {
    User.getFromToken().then((data) => {
      if (data.username) {
        setUser({ ...data });
        setIsAuthenticated(true);
      } else {
        setUser(null);
      }
    });
  }, []);

  return isAuthenticated ? children : "Unauthorized";
}

AuthenticateBeforeRender.propTypes = {
  children: PropTypes.element.isRequired,
};
