import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { login, logout } from "../../redux/features/userSlice";
import axios from "axios";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const userState = useSelector((state) => state.userState);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   loadUser();
  // }, []);

  const loadUser = async () => {};

  return <Outlet />;
};

export default ProtectedRoute;
