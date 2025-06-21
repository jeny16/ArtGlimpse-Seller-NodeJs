import React from "react";
import { Typography, Box, Button, Tooltip, useTheme, Badge, IconButton } from "@mui/material";
import {
    Refresh as RefreshIcon,
    Receipt as ReceiptIcon
} from "@mui/icons-material";

const OrderHeader = ({ onRefresh }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                    sx={{
                        mr: 2,
                        bgcolor: "rgba(193, 121, 18, 0.1)",
                        borderRadius: 2,
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <ReceiptIcon sx={{ color: theme.palette.custom.highlight, fontSize: 28 }} />
                </Box>
                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        Order Management
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage and track all your customer orders
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Tooltip title="Refresh Orders">
                    <Button
                        variant="contained"
                        startIcon={<RefreshIcon />}
                        onClick={onRefresh}
                        sx={{
                            borderRadius: 2,
                            bgcolor: theme.palette.custom.highlight,
                            color: theme.palette.common.white,
                            "&:hover": {
                                bgcolor: theme.palette.custom.accent,
                            },
                        }}
                    >
                        Refresh
                    </Button>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default OrderHeader;