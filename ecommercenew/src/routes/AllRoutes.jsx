import React from "react";
import Addresses from "../pages/user/Addresses/Addresses";
import Profile from "../pages/user/profile/Profile";
import AllGroup from "../pages/admin/groups/AllGroup/AllGroup";
import AddGroup from "../pages/admin/groups/AddGroup/AddGroup";
import AddSubCategory from "../pages/admin/subcategories/AddSubCategory/AddSubCategory";
import PaymentSuccess from "../pages/user/paymentSuccess/PaymentSuccess";
import Checkout from "../pages/user/checkout/Checkout";
import CartPage from "../pages/user/cart/CartPage";
import AdminAddProduct from "../pages/admin/products/AdminAddProduct/AdminAddProduct";
import AddCategory from "../pages/admin/categories/AddCategory/AddCategory";
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import AdminAllProducts from "../pages/admin/products/AdminAllProducts/AdminAllProducts";
import AllProducts from "../pages/user/products/AllProducts/AllProducts";
import AllCategories from "../pages/admin/categories/AllCategories/AllCategories";
import NotFound404 from "../pages/NotFound404/NotFound404";
import Login from "../features/login/Login";
import SignUp from "../features/SignUp.jsx/SignUp";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import SingleProduct from "../pages/user/products/SingleProduct/SingleProduct";
import AllUser from "../pages/admin/users/AllUsers";
import { Route, Routes } from "react-router-dom";
import "./AllRoutes.css";

const AllRoutes = ({ loading }) => {
  return (
    <div className="allroutes">
      <Routes>
        <Route path="/" element={<AllProducts />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/products" element={<AllProducts />} />
        <Route path="product/">
          <Route path=":id" element={<SingleProduct />} />
        </Route>

        <Route element={<ProtectedRoute loading={loading} />}>
          <Route path="/admin/">
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="groups/add" element={<AddGroup />} />
            <Route path="groups/all" element={<AllGroup />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/all" element={<AllCategories />} />
            <Route path="subcategories/add" element={<AddSubCategory />} />
            <Route path="subcategories/all" element={<AllCategories />} />
            <Route path="products/add" element={<AdminAddProduct />} />
            <Route path="products/all" element={<AdminAllProducts />} />
            <Route path="users/all" element={<AllUser />} />
          </Route>

          <Route path="/profile/">
            <Route path="me" element={<Profile />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Route>

        <Route path="/paymentsuccess" element={<PaymentSuccess />} />

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
