import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
  Button,
  Chip,
  useTheme,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  KeyboardArrowRight as ArrowIcon,
} from "@mui/icons-material";
import { fetchOrders } from "../store/orderSlice";
import { useNavigate } from "react-router-dom";

const RecentOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const theme = useTheme();
  const storedUser = JSON.parse(localStorage.getItem("seller"));
  const sellerId = storedUser?.userId;

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchOrders(sellerId));
    }
  }, [dispatch, sellerId]);

  const handleRefresh = () => {
    if (sellerId) {
      dispatch(fetchOrders(sellerId));
    }
  };

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleViewAllOrders = () => {
    navigate("/orders");
  };

  const sortedOrders = [...orders]
    .filter((order) => order.orderStatus === "New") // Filter only 'New' orders
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const displayedOrders = sortedOrders.slice(0, 4); // Display up to 4 new orders

  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        backgroundColor: "white",
        p: 2
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "white",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <Typography
          variant="h6" sx={{ mb: 2, fontWeight: 600 }}
        >
          Recent Orders
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "4px",
              px: 3,
              py: 1,
              color: theme.palette.custom.highlight,
              borderColor: theme.palette.custom.highlight,
              "&:hover": {
                borderColor: theme.palette.custom.accent,
                backgroundColor: theme.palette.tints.tint2,
              },
              flex: { xs: 1, sm: "none" },
            }}
            size="small"
            onClick={handleViewAllOrders}
          >
            View All
          </Button>
          <IconButton size="small" onClick={handleRefresh}>
            <RefreshIcon fontSize="small" sx={{ m: 1, color: theme.palette.custom.highlight }} />
          </IconButton>
        </Box>
      </Box>

      {/* Content */}
      {loading ? (
        <Box sx={{ p: 2, textAlign: "center" }}>Loading...</Box>
      ) : error ? (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography color="error">{error}</Typography>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "4px",
              px: 3,
              py: 1,
              color: theme.palette.custom.highlight,
              borderColor: theme.palette.custom.highlight,
              "&:hover": {
                borderColor: theme.palette.custom.accent,
                backgroundColor: theme.palette.tints.tint2,
              },
              flex: { xs: 1, sm: "none" },
            }}
            onClick={handleRefresh}
          >
            Try Again
          </Button>
        </Box>
      ) : displayedOrders.length === 0 ? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography>No new orders found.</Typography>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "4px",
              px: 3,
              py: 1,
              color: theme.palette.custom.highlight,
              borderColor: theme.palette.custom.highlight,
              "&:hover": {
                borderColor: theme.palette.custom.accent,
                backgroundColor: theme.palette.tints.tint2,
              },
              flex: { xs: 1, sm: "none" },
            }}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ p: 2 }}>
          {displayedOrders.map((order) => {
            const orderId = order._id || order.id;
            const totalItems =
              order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

            return (
              <Grid item xs={12} key={orderId}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item xs={12} sm={5}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {order.title || `Order #${orderId}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {order.shippingAddress?.name || "No customer name"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(order.createdAt).toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Typography variant="h6" fontWeight={600}>
                          ₹{order.totalAmount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {totalItems} {totalItems > 1 ? "items" : "item"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={2} sx={{ textAlign: "right" }}>
                        <Chip
                          label={order.orderStatus || "Unknown Status"}
                          size="small"
                          color="primary"
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(orderId)}
                        >
                          <ArrowIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default RecentOrders;
