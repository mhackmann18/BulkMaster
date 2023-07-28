import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useUser from "./useUser";

export default function useLogout() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const logout = (message) => {
    Cookies.remove("access_token");
    setUser(null);
    if (message) {
      navigate("/login", { state: { successMessage: message } });
    }
  };

  return logout;
}
