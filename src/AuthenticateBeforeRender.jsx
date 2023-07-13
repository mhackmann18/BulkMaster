import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import User from "./utils/UserController";
import useUser from "./hooks/useUser";
import LoadingScreen from "./components/common/LoadingScreen";

export default function AuthenticateBeforeRender({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, user } = useUser();

  useEffect(() => {
    User.getFromToken().then(({ data, error }) => {
      if (data) {
        setUser({ ...data });
      } else if (error) {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  const isAuthenticated = !!user;

  const contentToLoad = isAuthenticated ? children : <Navigate to="/login" />;

  return isLoading ? <LoadingScreen /> : contentToLoad;
}

AuthenticateBeforeRender.propTypes = {
  children: PropTypes.element.isRequired,
};
