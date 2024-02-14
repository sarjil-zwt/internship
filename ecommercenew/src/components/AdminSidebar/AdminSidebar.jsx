import {
  Avatar,
  Drawer,
  IconButton,
  List,
  Stack,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import sizeConfigs from "../../configs/sizeConfigs";
import colorConfigs from "../../configs/colorConfigs";
import SidebarItemCollapse from "../Sidebar/SidebarItemCollapse";
import SidebarItem from "../Sidebar/SidebarItem";
import {
  Add,
  CategoryOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  DashboardOutlined,
  GridViewOutlined,
  GroupAddOutlined,
  PersonOutline,
  ShoppingCartOutlined,
  StyleOutlined,
  WorkspacesOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";
import { useTheme } from "@emotion/react";

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
        icon: <GridViewOutlined />,
      },
      child: [
        {
          path: "admin/groups/all",
          sidebarProps: {
            displayText: "All Groupes",
            icon: <WorkspacesOutlined />,
          },
        },
        {
          path: "admin/groups/add",
          sidebarProps: {
            displayText: "Add Group",
            icon: <Add />,
          },
        },
        {
          path: "admin/categories/all",
          sidebarProps: {
            displayText: "All Categories",
            icon: <CategoryOutlined />,
          },
        },
        {
          path: "admin/categories/add",
          sidebarProps: {
            displayText: "Add Category",
            icon: <Add />,
          },
        },
        {
          path: "admin/subcategories/all",
          sidebarProps: {
            displayText: "All SubCategory",
            icon: <CategoryOutlined />,
          },
        },
        {
          path: "admin/subcategories/add",
          sidebarProps: {
            displayText: "Add Subcategory",
            icon: <Add />,
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
    <div className="adminsidebar">
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
