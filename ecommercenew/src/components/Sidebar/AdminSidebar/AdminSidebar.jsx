import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import sizeConfigs from "../../../configs/sizeConfigs";
import colorConfigs from "../../../configs/colorConfigs";
import SidebarItemCollapse from "../SidebarItemCollapse";
import SidebarItem from "../SidebarItem";
import {
  CategoryOutlined,
  DashboardOutlined,
  GroupAddOutlined,
  PersonOutline,
  ShoppingCartOutlined,
  StyleOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const userState = useSelector((state) => state.userState);
  const cartState = useSelector((state) => state.cartState);

  const appRoutes = [
    {
      path: "/admin/dashboard",
      sidebarProps: {
        displayText: "Dashboard",
        icon: <DashboardOutlined />,
      },
    },
    {
      path: "/profile",
      isProtected: true,
      sidebarProps: {
        displayText: "Profile",
        icon: <PersonOutline />,
      },
      child: [
        {
          path: "/profile/me",
          sidebarProps: {
            displayText: "My Profile",
          },
        },
        {
          path: "/profile/addresses",
          sidebarProps: {
            displayText: "Addresses",
          },
        },
      ],
    },
    {
      path: "/products",
      sidebarProps: {
        displayText: "Products",
        icon: <StyleOutlined />,
      },
      child: [
        {
          path: "admin/products/all",
          sidebarProps: {
            displayText: "All Products",
          },
        },
        {
          path: "admin/products/add",
          sidebarProps: {
            displayText: "Add Products",
          },
        },
      ],
    },
    {
      path: "/categories",
      sidebarProps: {
        displayText: "Categories",
        icon: <CategoryOutlined />,
      },
      child: [
        {
          path: "admin/categories/all",
          sidebarProps: {
            displayText: "All Categories",
          },
        },
        {
          path: "admin/categories/add",
          sidebarProps: {
            displayText: "Add Category",
          },
        },
      ],
    },
    {
      path: "admin/users",
      sidebarProps: {
        displayText: "Users",
        icon: <GroupAddOutlined />,
      },
      child: [
        {
          path: "admin/users/all",
          sidebarProps: {
            displayText: "All Users",
          },
        },
      ],
    },
    {
      path: "/products",
      sidebarProps: {
        displayText: "Products",
        icon: <StyleOutlined />,
      },
    },
  ];

  return (
    <div className="sidebar">
      admin Sidebar
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
        </List>
      </Drawer>
    </div>
  );
};

export default AdminSidebar;
