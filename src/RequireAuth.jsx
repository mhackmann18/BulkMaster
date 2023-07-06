import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserContext } from "./UserContextProvider";

export default function RequireAuth({ children }) {
  const userContext = useContext(UserContext);

  const { user } = userContext;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
