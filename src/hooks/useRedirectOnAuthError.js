import { useNavigate } from "react-router-dom";
import config from "../utils/config";

export default function useRedirectOnAuthError() {
  const navigate = useNavigate();

  const redirectOnAuthError = (error) => {
    if (error === config.INVALID_TOKEN_ERR || error === config.NO_TOKEN_ERR) {
      navigate("/login", {
        state: {
          errorMessage: "Your token has expired. Please re-login",
        },
      });
    }
  };

  return redirectOnAuthError;
}
