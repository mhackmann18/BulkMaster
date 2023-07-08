import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import User from "./utils/UserController";
import useUser from "./hooks/useUser";

export default function AuthenticateBeforeRender({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, setUser } = useUser();
  const { token } = user;

  useEffect(() => {
    if (token) {
      User.getFromToken(token).then((data) => {
        if (data.username) {
          setUser({ ...data, token });
          setIsAuthenticated(true);
        } else {
          setUser(null);
        }
      });
    }
  }, []);

  return isAuthenticated ? children : "Permission denied";
}

AuthenticateBeforeRender.propTypes = {
  children: PropTypes.element.isRequired,
};
