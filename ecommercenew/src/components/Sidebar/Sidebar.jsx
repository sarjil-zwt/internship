import { Avatar, Drawer, List, Stack, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProfileIcon from '../ProfileIcon/ProfileIcon';
import sizeConfigs from '../../configs/sizeConfigs';
import colorConfigs from '../../configs/colorConfigs';
import SidebarItemCollapse from './SidebarItemCollapse';
import SidebarItem from './SidebarItem';
import { CategoryOutlined, GroupAddOutlined, PersonOutline, ShoppingCartOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./Sidebar.css"





const Sidebar = () => {

    const [expanded, setExpanded] = useState(false)
    const userState = useSelector((state) => state.userState)
    const cartState = useSelector(state => state.cartState)


    const appRoutes = [
        {
            path: "/profile",
            isProtected: true,
            sidebarProps: {
                displayText: "Profile",
                icon: <PersonOutline />
            },
            child: [
                {
                    path: "/profile/me",
                    sidebarProps: {
                        displayText: "My Profile"
                    },
                },
                {
                    path: "/profile/addresses",
                    sidebarProps: {
                        displayText: "Addresses"
                    },
                }

            ]
        },
        {
            path: "/products",
            sidebarProps: {
                displayText: "Products",
                icon: <CategoryOutlined />
            },
            child: [
                {
                    path: "/products/all",
                    sidebarProps: {
                        displayText: "All Products"
                    },
                },
                {
                    path: "/products/add",
                    sidebarProps: {
                        displayText: "Add Products"
                    },
                }

            ]
        },
        {
            path: "/users",
            sidebarProps: {
                displayText: "Users",
                icon: <GroupAddOutlined />
            },
            child: [
                {
                    path: "/users/all",
                    sidebarProps: {
                        displayText: "All Users"
                    },
                }

            ]
        },
        {
            path: "/cart",
            sidebarProps: {
                displayText: `Cart`,
                spanText: cartState.products.length,
                icon: <ShoppingCartOutlined />
            }
        },
    ];



    return (
        <div className='sidebar'>
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
                        color: colorConfigs.sidebar.color
                    }
                }}
            >
                <List disablePadding>
                    <Toolbar sx={{ marginBottom: "20px" }}>
                        <Stack
                            sx={{ width: "100%" }}
                            direction="row"
                            justifyContent="center"
                        >
                            {userState.isLoggedIn ? <Avatar /> : <Link to={"/login"}>Login</Link>}
                        </Stack>
                    </Toolbar>
                    {appRoutes.map((route, index) => (
                        route.sidebarProps ? (
                            route.child ? (
                                <SidebarItemCollapse item={route} key={index} expanded={expanded} setExpanded={setExpanded} index={index} />
                            ) : (
                                <SidebarItem item={route} key={index} />
                            )
                        ) : null
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default Sidebar