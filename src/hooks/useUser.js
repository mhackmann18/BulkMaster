import { useContext } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../UserContextProvider";

export default function useUser() {
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;

  const saveUser = (userData) => {
    if (userData) {
      const { username, id, token, theme } = userData;
      Cookies.set("token", token);
      setUser({ username, id, theme });
    } else {
      setUser(null);
    }
  };

  return { user: { ...user, token: Cookies.get("token") }, setUser: saveUser };
}
