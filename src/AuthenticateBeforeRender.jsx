import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import User from "./utils/UserController";
import useUser from "./hooks/useUser";
import LoadingScreen from "./components/common/LoadingScreen";

export default function AuthenticateBeforeRender({ children }) {
  const accessToken = Cookies.get("access_token");
  const [isLoading, setIsLoading] = useState(!!accessToken);
  const { setUser, user } = useUser();

  useEffect(() => {
    if (accessToken) {
      User.getFromToken().then(({ data, error }) => {
        if (data) {
          setUser({ ...data });
        } else if (error) {
          setUser(null);
        }
        setIsLoading(false);
      });
    } else {
      setUser(null);
    }
  }, []);

  const isAuthenticated = !!accessToken && !!user;

  const contentToLoad = isAuthenticated ? children : <Navigate to="/login" />;

  return isLoading ? <LoadingScreen /> : contentToLoad;
}

AuthenticateBeforeRender.propTypes = {
  children: PropTypes.element.isRequired,
};
