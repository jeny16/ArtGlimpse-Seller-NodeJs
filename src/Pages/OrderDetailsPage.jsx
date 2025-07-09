import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import OrderDetails from "../components/OrderDetails";
import { fetchOrders, selectOrders, updateOrderStatus } from "../store/orderSlice";
import { useTheme } from "@mui/material/styles";

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const theme = useTheme();

    useEffect(() => {
        if (!orders.length) {
            dispatch(fetchOrders());
        }
    }, [dispatch, orders.length]);

    const order = orders.find((o) => o._id === orderId);

    if (!order) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "80vh",
                }}
            >
                <CircularProgress sx={{ color: theme.palette.custom.highlight, mb: 2 }} />
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                    Loading Order Details...
                </Typography>
            </Box>
        );
    }

    // onClose now navigates back to the previous page
    const handleClose = () => {
        navigate(-1);
    };

    // onStatusChange dispatches the update action
    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatus({ orderId, newStatus }));
    };

    return (
        <Box
            sx={{
                p: { xs: 2, sm: 3 },
                minHeight: "100vh",
                maxWidth: "lg",
                mx: "auto",
                mt: 24,
            }}
        >
            <OrderDetails
                order={order}
                onClose={handleClose}
                onStatusChange={handleStatusChange}
            />
        </Box>
    );
};

export default OrderDetailsPage;
