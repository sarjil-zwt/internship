import { Badge, ListItemButton, ListItemIcon } from '@mui/material'
import { Link } from "react-router-dom";

import React from 'react'
import colorConfigs from '../../configs/colorConfigs';

const SidebarItem = ({ item }) => {
    return (
        <div>
            <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                    "&: hover": {
                        backgroundColor: colorConfigs.sidebar.hoverBg
                    },
                    paddingY: "12px",
                    paddingX: "24px"
                }}
            >
                <ListItemIcon sx={{
                    color: colorConfigs.sidebar.color
                }}>
                    <Badge anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                        badgeContent={item.sidebarProps.spanText} overlap='circular' color="primary">
                        {item.sidebarProps.icon && item.sidebarProps.icon}
                    </Badge>
                </ListItemIcon>

                {item.sidebarProps.displayText}
            </ListItemButton>
        </div>
    )
}

export default SidebarItem