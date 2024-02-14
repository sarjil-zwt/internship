import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfileIcon from "../../ProfileIcon/ProfileIcon";
import sizeConfigs from "../../../configs/sizeConfigs";
import colorConfigs from "../../../configs/colorConfigs";
import SidebarItemCollapse from "../SidebarItemCollapse";
import SidebarItem from "../SidebarItem";
import {
  CategoryOutlined,
  GroupAddOutlined,
  PersonOutline,
  PersonPinOutlined,
  RoomOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { logout } from "../../../redux/features/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../loader/Loader";

const UserSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const userState = useSelector((state) => state.userState);
  const { cart } = useSelector((state) => state.cartState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const appRoutes = [
    {
      path: "/profile",
      isProtected: true,
      sidebarProps: {
        displayText: "Profile",
        icon: <PersonPinOutlined />,
      },
      child: [
        {
          path: "/profile/me",
          sidebarProps: {
            displayText: "My Profile",
            icon: <PersonOutline />,
          },
        },
        {
          path: "/profile/addresses",
          sidebarProps: {
            displayText: "Addresses",
            icon: <RoomOutlined />,
          },
        },
      ],
    },
    {
      path: "/",
      sidebarProps: {
        displayText: "Products",
        icon: <CategoryOutlined />,
      },
    },

    {
      path: "/cart",
      sidebarProps: {
        displayText: `Cart`,
        spanText: cart?.CartItems?.length,
        icon: <ShoppingCartOutlined />,
      },
    },
  ];

  const handleLogout = async () => {
    setLoading(true);
    await axios
      .get("/auth/logout")
      .then((res) => {
        dispatch(logout());
        navigate("/login");
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
    <div className="sidebar">
      {loading && <Loader />}
      <Drawer
        variant="permanent"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sizeConfigs.sidebar.width,
            boxSizing: "border-box",
            borderRight: "0px",
            backgroundColor: colorConfigs.sidebar.bg,
            color: colorConfigs.sidebar.color,
          },
        }}
      >
        <List disablePadding>
          <Toolbar sx={{ marginBottom: "20px" }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="center"
            >
              {userState.isLoggedIn ? (
                <Avatar />
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </Stack>
          </Toolbar>
          {appRoutes.map((route, index) =>
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse
                  item={route}
                  key={index}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  index={index}
                />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null
          )}

          <div className="sidebar_logout_btnwp">
            <button className="sidebarlgotbtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </List>
      </Drawer>
    </div>
  );
};

export default UserSidebar;
