import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import User from "./utils/UserController";
import useUser from "./hooks/useUser";
import LoadingScreen from "./components/common/LoadingScreen";

export default function AuthenticateBeforeRender({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useUser();

  useEffect(() => {
    User.getFromToken().then(({ data, error }) => {
      if (data) {
        setUser({ ...data });
        setIsAuthenticated(true);
      } else if (error) {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  // eslint-disable-next-line no-nested-ternary
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : isLoading ? (
    <LoadingScreen />
  ) : (
    children
  );
}

AuthenticateBeforeRender.propTypes = {
  children: PropTypes.element.isRequired,
};
