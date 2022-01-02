import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../Home";
import CoinList from "../coins/CoinList";
import SigninForm from "../auth/SigninForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../ProfileForm";
import PrivateRoute from "./PrivateRoute";
import WatchList from "../watchlist/WatchList";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signin" element={<SigninForm />} />
      <Route exact path="/signup" element={<SignupForm />} />
      <Route
        exact
        path="/profile"
        element={
          <PrivateRoute>
            <ProfileForm />
          </PrivateRoute>
        }
      />
      <Route
        exact
        path="/coins"
        element={
          <PrivateRoute>
            <CoinList />
          </PrivateRoute>
        }
      />
      <Route
        path="/watchlist"
        element={
          <PrivateRoute>
            <WatchList />
          </PrivateRoute>
        }
      />

      <Route element={<p>not found</p>}></Route>
    </Routes>
  );
};

export default AllRoutes;
