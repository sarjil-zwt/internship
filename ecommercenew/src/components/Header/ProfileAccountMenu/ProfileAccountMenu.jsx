import {
  LocalMallOutlined,
  Logout,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { logout } from "../../../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../loader/Loader";

const ProfileAccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userState = useSelector((state) => state.userState);
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
    <>
      {loading && <Loader />}
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={userState.userState.vImage}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        sx={{
          overflow: "visible",
          filter: "",
          mt: 1.5,
          zIndex: 2000000,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/profile/cart">
            <ListItemIcon>
              <IoCartOutline fontSize="20px" />
            </ListItemIcon>
            Cart
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/profile/orders">
            <ListItemIcon>
              <FaBoxOpen fontSize="20px" />
            </ListItemIcon>
            Orders
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/profile/addresses">
            <ListItemIcon>
              <MdLocationOn fontSize="20px" />
            </ListItemIcon>
            Addresses
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <AiOutlineLogout fontSize="20px" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileAccountMenu;
