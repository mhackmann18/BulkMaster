import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useUser from "./useUser";

export default function useLogout() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const logout = (message) => {
    Cookies.remove("access_token", { path: "/", domain: "localhost" });
    setUser(null);
    if (message) {
      navigate("/login", { state: { successMessage: message } });
    }
  };

  return logout;
}
