import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userState);
  console.log(user, "user");
  const dispatch = useDispatch();

  if (user.isLoggedIn) {
    return children;
  } else if (user.isLoggedIn) {
    dispatch(logout({}));
  } else {
    return <Navigate to="/login" />;
    // return <Navigate to="/login" state={{ from: location }} replace />
  }
};

export default ProtectedRoute;
