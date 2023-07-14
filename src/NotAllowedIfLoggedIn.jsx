import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import User from "./utils/UserController";
import useUser from "./hooks/useUser";
import LoadingScreen from "./components/common/LoadingScreen";

export default function NotAllowedIfLoggedIn({ children }) {
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
    } else if (user) setUser(null);
  }, []);

  const isAuthenticated = !!accessToken && !!user;

  const contentToLoad = isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    children
  );

  return isLoading ? <LoadingScreen /> : contentToLoad;
}

NotAllowedIfLoggedIn.propTypes = {
  children: PropTypes.element.isRequired,
};
