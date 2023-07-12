import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import User from "./utils/UserController";
import useUser from "./hooks/useUser";
import Spinner from "./components/common/Spinner";

export default function AuthenticateBeforeRender({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useUser();

  useEffect(() => {
    User.getFromToken().then((data) => {
      if (data.username) {
        setUser({ ...data });
        setIsAuthenticated(true);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  // eslint-disable-next-line no-nested-ternary
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : isLoading ? (
    <Spinner />
  ) : (
    children
  );
}

AuthenticateBeforeRender.propTypes = {
  children: PropTypes.element.isRequired,
};
