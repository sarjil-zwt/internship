import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import MyProfile from "./pages/user/profile/MyProfile";
import Addresses from "./pages/user/profile/Addresses";

import AllUser from "./pages/admin/users/AllUser";
// import CartPage from "./pages/cart/CartPage";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SingleProduct from "./pages/user/products/SingleProduct/SingleProduct";
import toast, { Toaster } from "react-hot-toast";
import Login from "./features/login/Login";
import SignUp from "./features/SignUp.jsx/SignUp";
import AdminSidebar from "./components/Sidebar/AdminSidebar/AdminSidebar";
import UserSidebar from "./components/Sidebar/UserSidebar/UserSidebar";
import NotFound404 from "./pages/NotFound404/NotFound404";
import axios from "axios";
import { login } from "./redux/features/userSlice";
import { useEffect, useState } from "react";
import AdminAddProduct from "./pages/admin/products/AdminAddProduct/AdminAddProduct";
import AddCategory from "./pages/admin/categories/AddCategory/AddCategory";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import AdminAllProducts from "./pages/admin/products/AdminAllProducts/AdminAllProducts";
import AllProducts from "./pages/user/products/AllProducts/AllProducts";

function App() {
  const userState = useSelector((state) => state.userState);
  console.log(userState, "userState");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/user/me")
      .then((res) => {
        setLoading(false);
        dispatch(login(res.data));
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successfull");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        // dispatch(setLoading(false))
        toast.error(err);
      });
  }, []);

  return (
    <div className="App">
      <Toaster position="bottom-right" />
      {userState?.isLoggedIn && userState?.userState?.role == "user" && (
        <UserSidebar />
      )}
      {userState?.isLoggedIn && userState?.userState?.role == "admin" && (
        <AdminSidebar />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AllProducts />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/products" element={<AllProducts />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/categories/add" element={<AddCategory />} />

        <Route path="admin/product/">
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <SingleProduct />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="admin/products/add"
          element={
            <ProtectedRoute>
              <AdminAddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/products/all"
          element={
            <ProtectedRoute>
              <AdminAllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/users/all"
          element={
            <ProtectedRoute>
              <AllUser />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
