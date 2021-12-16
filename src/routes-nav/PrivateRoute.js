import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../auth/UserContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useUserContext();
  console.debug("PrivateRoute", "currentUser=", currentUser);
  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
