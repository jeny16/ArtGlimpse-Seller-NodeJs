import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus, selectOrders } from "../store/orderSlice";
import {
  Paper,
  CircularProgress,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TablePagination,
  useTheme,
} from "@mui/material";
import { Refresh as RefreshIcon, Close as CloseIcon } from "@mui/icons-material";
import { OrderHeader, OrderSearch, OrderTable, OrderTabs } from "../components";
import { useNavigate } from "react-router-dom";
import { isValidTransition } from "../components/ordersStatus";
import { toast } from "react-toastify";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrders);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);
  const theme = useTheme();

  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const tabLabels = ["All", "New", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchOrders());
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setPage(0);
    setSearchTerm("");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusChange = (orderId, newStatus) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    if (!isValidTransition(order.status, newStatus, order)) {
      toast.error(`Transition from "${order.status}" to "${newStatus}" is not allowed.`);
      return;
    }
    dispatch(updateOrderStatus({ orderId, newStatus }));
  };

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];
    if (currentTab !== 0) {
      const filterLabel = tabLabels[currentTab];
      filtered = filtered.filter((order) => order.status === filterLabel);
    }
    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter((order) => {
        if (order.id && order.id.toString().toLowerCase().includes(search)) return true;
        if (order.shippingAddress?.name && order.shippingAddress.name.toLowerCase().includes(search)) return true;
        if (order.items && Array.isArray(order.items)) {
          return order.items.some((item) =>
            (item.productName || item.name || "").toLowerCase().includes(search)
          );
        }
        return false;
      });
    }
    return filtered;
  }, [orders, currentTab, tabLabels, searchTerm]);

  const handleRowClick = (order) => {
    navigate(`/orders/${order._id}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <CircularProgress sx={{ color: theme.palette.custom.highlight, mb: 2 }} />
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
          Loading your orders...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          bgcolor: "#FFF3F3",
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            color="error"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CloseIcon sx={{ mr: 1 }} />
            Error Loading Orders
          </Typography>
          <Typography color="error.dark" sx={{ mb: 2 }}>
            {typeof error === "object" ? JSON.stringify(error) : error}
          </Typography>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{
              borderRadius: 2,
              backgroundColor: theme.palette.custom.highlight,
              color: "#fff",
              "&:hover": { backgroundColor: theme.palette.custom.accent },
            }}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (

    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        minHeight: "100vh",
        mt: 24,
        mb: 10,
        maxWidth: "lg",
        width: "100%",
        mx: "auto",
      }}
    >
      <OrderHeader onRefresh={handleRefresh} />
      <Divider sx={{ my: 2 }} />
      <OrderSearch searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <OrderTabs
        currentTab={currentTab}
        onTabChange={handleTabChange}
        tabLabels={tabLabels}
      />
      {filteredOrders.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
            No orders found
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 400, mx: "auto", mb: 3 }}>
            {searchTerm
              ? `No results match "${searchTerm}". Try a different search term.`
              : currentTab !== 0
                ? `No orders with status "${tabLabels[currentTab]}" found.`
                : "No orders available. New orders will appear here."}
          </Typography>
          {searchTerm && (
            <Button variant="outlined" onClick={() => setSearchTerm("")} sx={{ borderRadius: 2 }}>
              Clear Search
            </Button>
          )}
        </Box>
      ) : (
        <>
          <OrderTable
            orders={filteredOrders}
            page={page}
            rowsPerPage={rowsPerPage}
            onRowClick={handleRowClick}
            onStatusChange={handleStatusChange}
          />
          <TablePagination
            component="div"
            count={filteredOrders.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sx={{
              ".MuiTablePagination-selectIcon": { color: theme.palette.custom.highlight },
            }}
          />
        </>
      )}
    </Paper>
  );
};

export default OrderManagement;
