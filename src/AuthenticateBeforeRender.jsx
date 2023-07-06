import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import User from "./controllers/User";
import useToken from "./hooks/useToken";

export default function AuthenticateBeforeRender({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token } = useToken();

  useEffect(() => {
    if (token) {
      User.checkToken(token).then((authenticated) => {
        setIsAuthenticated(authenticated);
      });
    }
  }, []);

  return isAuthenticated ? children : null;
}

AuthenticateBeforeRender.propTypes = {
  children: PropTypes.element.isRequired,
};
