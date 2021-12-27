import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../Home";
import CoinList from "../coins/CoinList";
import CompanyList from "../companies/CompanyList";
import SigninForm from "../auth/SigninForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../ProfileForm";
import CompanyDetail from "../companies/CompanyDetail";
import PrivateRoute from "./PrivateRoute";

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
        path="/companies"
        element={
          // <PrivateRoute>
          <CompanyList />
          // </PrivateRoute>
        }
      />

      <Route element={<p>not found</p>}></Route>
    </Routes>
  );
};

export default AllRoutes;
