import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../../components/loader/Loader";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await axios
      .get("/auth/logout")
      .then((res) => {
        dispatch(logout());
        navigate("/");
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "Something went wront!!");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="profilepage">
      {loading && <Loader />}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
