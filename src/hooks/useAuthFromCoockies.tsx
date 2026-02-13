import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookies";

export function useAuthFromCookie(tokenName = "jwt-token") {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCookie(tokenName);
    setIsAuthenticated(Boolean(token && token.length > 0));
  }, [tokenName]);

  return { isAuthenticated };
}
