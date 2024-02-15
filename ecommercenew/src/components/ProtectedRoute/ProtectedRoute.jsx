import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../loader/Loader";

const ProtectedRoute = ({ loading }) => {
  const userState = useSelector((state) => state.userState);

  if (!loading) {
    return userState.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  } else {
  }
};

export default ProtectedRoute;
