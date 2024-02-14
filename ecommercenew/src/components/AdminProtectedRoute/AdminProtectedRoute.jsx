import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const userState = useSelector((state) => state.userState);

  if (userState.isLoggedIn && userState.userState.eRole !== "Admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminProtectedRoute;
