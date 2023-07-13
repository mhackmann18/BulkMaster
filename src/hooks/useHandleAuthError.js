import { useNavigate } from "react-router-dom";
import config from "../utils/config";

export default function useHandleAuthError() {
  const navigate = useNavigate();

  const handleAuthError = (error) => {
    if (error === config.INVALID_TOKEN_ERR || error === config.NO_TOKEN_ERR) {
      navigate("/login", {
        state: {
          errorMessage: "Your token has expired. Please re-login",
        },
      });
    }
  };

  return handleAuthError;
}
