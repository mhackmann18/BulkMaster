import { useState } from "react";
import Cookies from "js-cookie";

export default function useToken() {
  const getToken = () => {
    const userToken = Cookies.get("token");
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    Cookies.set("token", userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
