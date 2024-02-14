import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { login } from "./redux/features/userSlice";
import Loader from "./components/loader/Loader";
import { setCartState } from "./redux/features/cartSlice";
import { setAddressesState } from "./redux/features/addressSlice";
import Header from "./components/Header/Header";
import { setGroupsState } from "./redux/features/groupSlice";
import AllRoutes from "./routes/AllRoutes";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";

function App() {
  const userState = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
    // navigate(localStorage.getItem("lastLocation"))
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);

      await axios
        .get("/groups")
        .then((res) => {
          dispatch(setGroupsState(res.data.groups));
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.message || "Error");
        });

      await axios
        .get("/user/me")
        .then((res) => {
          dispatch(login(res.data));
          toast.success("Login Successful");
        })
        .catch((err) => {
          console.log(err.response.data.message || "Error loading user");
          toast.error("Please Login");
          // navigate("/login"); // Programmatically navigate to the login page
        });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userState.isLoggedIn) {
      axios
        .get("/cart")
        .then((res) => {
          dispatch(setCartState(res.data.cart));
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.message || "Error");
        });

      axios
        .get("/addresses")
        .then((res) => {
          dispatch(setAddressesState(res.data.addresses));
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.message || "Error");
        });
    }
  }, [userState.isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("lastLocation", location.pathname);
  }, [location]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="App">
      <Toaster position="top-right" containerStyle={{ zIndex: 10000000 }} />

      {loading && <Loader />}

      {userState?.isLoggedIn && userState?.userState?.eRole === "admin" && (
        <AdminSidebar />
      )}

      <Header />
      <AllRoutes />
    </div>
  );
}

export default App;
