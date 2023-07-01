import { createContext, useEffect, useState } from "react";

import authService from "../services/auth.services";
// import { verify } from "../services/auth.services";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Handle token
  const storeToken = token => localStorage.setItem("authToken", token);
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const authenticateUser = () => {
    const storedToken = getToken();
    if (!storedToken) {
      logOutUser();
    } else {
      authService
        .verify(storedToken)
        .then(({ data }) => {
          const user = data;
          console.log("DATA", data);
          console.log("SKILLS", data.skillsList);
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch(() => logOutUser());
    }
  };

/* 
  const authenticateUser = async () => {
    try {
      const response = await authService() 
      console.log(response.data) 
      setIsLoggedIn(true) 
      setIsLoading(false) 
      setUser(response.data)
     } catch(error) {
      console.log(error)
      setIsLoggedIn(false) 
      setIsLoading(false) 
      setUser(null)
     } */


  const logOutUser = () => {
    removeToken();
    setIsLoggedIn(false);
    setIsLoading(false);
    setUser(null);
  };

  useEffect(() => {
    authenticateUser();
  });

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



/* const authenticatedUser = async () => { try { const response = await verifyService() console.log(response.data/) setIsUserActive(true) setIsUserAdmin(true) setUser(response.data/) // le damos el payload setIsFetching(false) } catch (error) { console.log(error) setIsUserActive(false) setIsUserAdmin(false) setUser(null) // el usuario no se logro logear */
