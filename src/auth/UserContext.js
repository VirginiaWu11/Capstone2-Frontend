import React, { useState, useContext, useEffect } from "react";
import BackendApi from "../api";
import useLocalStorage from "../hooks/useLocalStorage";
import jwt from "jsonwebtoken";

export const UserContext = React.createContext();
export const TOKEN_STORAGE_ID = "coinWallet-token";

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token).sub;
            console.debug({ token, username }, jwt.decode(token).sub);
            BackendApi.token = token;
            let currentUserRes = await BackendApi.getCurrentUser(username);
            setCurrentUser(currentUserRes);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      // set infoLoaded to false while async getCurrentUser runs; once the
      // data is fetched (or even if an error happens!), this will be set back
      // to false to control the spinner.
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token, setCurrentUser]
  );

  async function signup(signupData) {
    try {
      let token = await BackendApi.register(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function signin(loginData) {
    try {
      let token = await BackendApi.signin(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function signout() {
    setCurrentUser(null);
    setToken(null);
  }

  const updateProfile = async (username, newUserData) => {
    try {
      let updatedUser = await BackendApi.updateProfile(username, newUserData);
      console.debug("appjs", { updatedUser });
      return { success: true, updatedUser };
    } catch (errors) {
      return { success: false, errors };
    }
  };

  const value = {
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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
