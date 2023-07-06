import { useContext } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../UserContextProvider";

export default function useUser() {
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;

  const saveUser = ({ username, id, token, theme }) => {
    Cookies.set("token", token);
    setUser({ username, id, theme });
  };

  return { user: { ...user, token: Cookies.get("token") }, setUser: saveUser };
}
