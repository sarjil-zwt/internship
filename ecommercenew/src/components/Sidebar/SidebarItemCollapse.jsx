import { Accordion, AccordionDetails, AccordionSummary, List, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import colorConfigs from '../../configs/colorConfigs'
import { ExpandMoreOutlined } from '@mui/icons-material'
import SidebarItem from './SidebarItem'

const SidebarItemCollapse = ({ expanded, index, item, setExpanded }) => {


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div>
            <>
                <Accordion expanded={expanded === index} onChange={handleChange(index)} sx={{

                    color: "white",
                    boxShadow: "none",
                    border: "none",
                    margin: "0px",
                    backgroundColor: colorConfigs.sidebar.bg

                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreOutlined sx={{ color: "white" }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                            paddingX: "24px",
                            backgroundColor: colorConfigs.sidebar.bg,
                            "&: hover": {
                                backgroundColor: colorConfigs.sidebar.hoverBg
                            },
                            margin: "0px"
                        }}
                    >
                        <ListItemIcon sx={{
                            color: colorConfigs.sidebar.color,
                        }}>
                            {item.sidebarProps.icon && item.sidebarProps.icon}
                        </ListItemIcon>
                        <ListItemText
                            disableTypography
                            primary={
                                <Typography>
                                    {item.sidebarProps.displayText}
                                </Typography>
                            }
                        />
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: "0px"
                    }}>
                        <List >
                            {item.child?.map((route, index) => (
                                route.sidebarProps ? (
                                    route.child ? (
                                        <SidebarItemCollapse item={route} key={index} />
                                    ) : (
                                        <SidebarItem item={route} key={index} />
                                    )
                                ) : null
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </>
        </div>
    )
}

export default SidebarItemCollapse