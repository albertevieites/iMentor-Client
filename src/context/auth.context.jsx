import { createContext, useCallback, useEffect, useState } from "react";

import authService from "../services/auth.services";

const AuthContext = createContext();

// Handle token
const storeToken = token => localStorage.setItem("authToken", token);
const removeToken = () => {
  localStorage.removeItem("authToken");
};
const getToken = () => {
  return localStorage.getItem("authToken");
};

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Only wait for validation when there is a stored token
  const [isLoading, setIsLoading] = useState(() => Boolean(getToken()));
  const [user, setUser] = useState(null);

  const logOutUser = useCallback(() => {
    removeToken();
    setIsLoggedIn(false);
    setIsLoading(false);
    setUser(null);
  }, []);

  const verifyToken = useCallback((storedToken) => {
    authService
      .verify(storedToken)
      .then(({ data }) => {
        const user = data;
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
      })
      .catch(() => logOutUser());
  }, [logOutUser]);

  // User authentication
  const authenticateUser = () => {
    const storedToken = getToken();
    if (!storedToken) {
      logOutUser();
    } else {
      verifyToken(storedToken);
    }
  };

  // Validate stored token on first load
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      verifyToken(storedToken);
    }
  }, [verifyToken]);

  if(isLoading === true) {
    return <h3>...is validating user...</h3>
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProviderWrapper };
