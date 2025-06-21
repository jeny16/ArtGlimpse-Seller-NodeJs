import React from "react";
import { Box, Tabs, Tab, useMediaQuery, useTheme, Badge } from "@mui/material";
import {
    ShoppingBag as ShoppingBagIcon,
    LocalShipping as ShippingIcon,
    CheckCircle as DeliveredIcon,
    HourglassEmpty as PendingIcon,
    Close as CloseIcon,
    FiberNew as NewIcon,
} from "@mui/icons-material";

const OrderTabs = ({ currentTab, onTabChange, tabLabels }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Tabs
            value={currentTab}
            onChange={onTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
            sx={{
                mb: 2,
                "& .MuiTabs-indicator": { backgroundColor: theme.palette.custom.highlight },
                "& .Mui-selected": { color: `${theme.palette.custom.highlight} !important`, fontWeight: "bold" },
                "& .MuiTab-root": {
                    color: "#757575",
                    transition: "all 0.2s ease",
                    borderRadius: 1.5,
                    minHeight: "48px",
                    "&:hover": { color: theme.palette.custom.accent, backgroundColor: theme.palette.action.hover },
                },
            }}
        >
            {tabLabels.map((label) => (
                <Tab
                    key={label}
                    label={
                        <Badge color="primary" badgeContent={0}>
                            {label === "New" ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <NewIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.custom.highlight }} />
                                    {label}
                                </Box>
                            ) : label === "Processing" ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <ShoppingBagIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.custom.highlight }} />
                                    {label}
                                </Box>
                            ) : label === "Shipped" ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <ShippingIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.custom.highlight }} />
                                    {label}
                                </Box>
                            ) : label === "Delivered" ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <DeliveredIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.custom.highlight }} />
                                    {label}
                                </Box>
                            ) : label === "Pending" ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <PendingIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.custom.highlight }} />
                                    {label}
                                </Box>
                            ) : label === "Cancelled" ? (
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <CloseIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.custom.highlight }} />
                                    {label}
                                </Box>
                            ) : (
                                label
                            )}
                        </Badge>
                    }
                    sx={{ borderRadius: 1, mx: 0.5 }}
                />
            ))}
        </Tabs>
    );
};

export default OrderTabs;
