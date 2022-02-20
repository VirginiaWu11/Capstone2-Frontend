import React from "react";
import { UserContext } from "./auth/UserContext";

const demoUser = {
  username: "testuser",
  first_name: "testfirst",
  last_name: "testlast",
  email: "test@test.net",
};

const UserProvider = ({
  children,
  currentUser = demoUser,
  setCurrentUser,
  token,
  setToken,
  signup,
  signin,
  signout,
  updateProfile,
  infoLoaded,
  setInfoLoaded,
}) => (
  <UserContext.Provider
    value={{
      currentUser,
      setCurrentUser,
      token,
      setToken,
      signup,
      signin,
      signout,
      updateProfile,
      infoLoaded,
      setInfoLoaded,
    }}
  >
    {children}
  </UserContext.Provider>
);

export { UserProvider };
