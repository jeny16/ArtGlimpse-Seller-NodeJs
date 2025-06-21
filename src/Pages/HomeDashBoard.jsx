import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Changed: Import fetchOrders and selectOrders from your order slice instead of fetchStats
import { fetchOrders, selectOrders } from '../store/orderSlice';
import {
  Typography,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  Fab,
  Badge,
  Popover,
  Paper,
  Grow,
  ClickAwayListener,
  Card,
  CardContent
} from '@mui/material';
import {
  PlusCircle,
  ShoppingBag,
  BarChart2,
  Package,
  TrendingUp,
  DollarSign,
  Bell,
  ShoppingBagIcon
} from 'lucide-react';
import {
  StatCard,
  QuickActionCard,
  RecentOrders,
  ProductPerformance,
  NotificationWidget
} from '../components/index';
import { useNavigate } from 'react-router-dom';

const HomeDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Instead of using stats from a stat slice, we fetch orders and derive our stats
  const orders = useSelector(selectOrders);
  const userdata = JSON.parse(localStorage.getItem('seller'));
  const token = userdata?.token;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationAnchorRef = useRef(null);

  // Local state to store computed metrics from orders
  const [computedStats, setComputedStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProductsSold: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to compute metrics from the orders array.
  // Only includes orders whose orderStatus is not "Canceled" or "Returned"
  const calculateMetrics = (ordersArray) => {
    let totalRevenue = 0;
    let totalOrders = 0;
    let totalProductsSold = 0;

    ordersArray.forEach((order) => {
      if (order.orderStatus !== 'Canceled' && order.orderStatus !== 'Returned') {
        totalRevenue += order.totalAmount;
        totalOrders += 1;
        totalProductsSold += order.items.reduce((sum, item) => sum + item.quantity, 0);
      }
    });

    totalRevenue = parseFloat(totalRevenue.toFixed(2));  
    // Example conversion rate calculation: (products sold per valid order * 100).
    // Adjust this calculation based on your specific business logic.
    const conversionRate = totalOrders ? ((totalProductsSold / totalOrders) * 100).toFixed(1) : 0;

    return { totalRevenue, totalOrders, totalProductsSold, conversionRate };
  };

  // Dispatch fetchOrders on component mount
  useEffect(() => {
    if (token) {
      dispatch(fetchOrders())
        .unwrap()
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
      dispatch(fetchOrders())
        .unwrap()
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [dispatch, token]);

  // Whenever the orders are updated, calculate the metrics.
  useEffect(() => {
    if (orders && orders.length > 0) {
      const stats = calculateMetrics(orders);
      setComputedStats(stats);
    } else {
      // If there are no orders, reset metrics to 0
      setComputedStats({
        totalRevenue: 0,
        totalOrders: 0,
        totalProductsSold: 0,
        conversionRate: 0
      });
    }
    setLoading(false);
  }, [orders]);


  // Whenever the orders are updated, calculate the metrics.
  useEffect(() => {
    if (orders && orders.length > 0) {
      const stats = calculateMetrics(orders);
      setComputedStats(stats);
    } else {
      // If there are no orders, reset metrics to 0
      setComputedStats({
        totalRevenue: 0,
        totalOrders: 0,
        totalProductsSold: 0,
        conversionRate: 0
      });
    }
    setLoading(false);
  }, [orders]);

  const toggleNotifications = () => {
    setNotificationsOpen((prevOpen) => !prevOpen);
  };

  const handleCloseNotifications = (event) => {
    if (notificationAnchorRef.current && notificationAnchorRef.current.contains(event.target)) {
      return;
    }
    setNotificationsOpen(false);
  };

  // For demonstration, using a fixed unread notifications count
  const unreadNotifications = 3;

  if (loading) {
    return (
      <Box sx={{ mt: 16, p: 3 }}>
        <Typography variant="h6">Loading orders...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 16, p: 3 }}>
        <Typography variant="h6" color="error">
          Error: {error?.message}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", my: 16, minHeight: "100vh", px: 2, py: 4, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box component="main" sx={{ flexGrow: 1, width: "100%", maxWidth: "lg" }}>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              icon={DollarSign}
              title="Total Revenue"
              value={`₹${computedStats.totalRevenue || 0}`}
              change={15.5}
              color="primary.highlight"
              subtext="Net Sales"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              icon={ShoppingBag}
              title="Total Orders"
              value={computedStats.totalOrders || 0}
              change={22.3}
              color="success.main"
              subtext="Completed"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              icon={Package}
              title="Products Sold"
              value={computedStats.totalProductsSold || 0}
              change={10.7}
              color="warning.main"
              subtext="Unique Items"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatCard
              icon={TrendingUp}
              title="Conversion Rate"
              value={`${computedStats.conversionRate || 0}%`}
              change={5.2}
              color="secondary.main"
              subtext="Visitor to Order"
            />
          </Grid>
        </Grid>

        {/* Main Dashboard Content */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: "0 0 10px rgba(0,0,0,0.05)", overflow: "visible" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <QuickActionCard icon={Package} title="Inventory" description="Manage stock" onClick={() => navigate("/inventory")} />
                  </Grid>
                  <Grid item xs={12}>
                    <QuickActionCard icon={ShoppingBagIcon} title="Orders" description="See all Orders" onClick={() => navigate("/orders")} />
                  </Grid>
                  <Grid item xs={12}>
                    <QuickActionCard icon={PlusCircle} title="Add Product" description="Add new items" onClick={() => navigate("/add-product")} />
                  </Grid>
                  <Grid item xs={12}>
                    <QuickActionCard icon={BarChart2} title="Analytics" description="Check performance" onClick={() => navigate("/analytics")} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <RecentOrders />
              </Grid>
              <Grid item xs={12}>
                <ProductPerformance />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Notifications section (commented out) */}
      {/*
      <Fab
        color="primary"
        aria-label="notifications"
        sx={{ position: "fixed", bottom: 16, right: 16, display: { xs: "flex", md: "flex" } }}
        onClick={toggleNotifications}
        ref={notificationAnchorRef}
      >
        <Badge badgeContent={unreadNotifications} color="error">
          <Bell />
        </Badge>
      </Fab>

      <Popover
        open={notificationsOpen}
        anchorEl={notificationAnchorRef.current}
        onClose={handleCloseNotifications}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{
          "& .MuiPopover-paper": {
            width: { xs: "90%", sm: 350 },
            maxHeight: 500,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            mb: 1,
          },
        }}
      >
        <ClickAwayListener onClickAway={handleCloseNotifications}>
          <Grow in={notificationsOpen}>
            <Paper sx={{ overflow: "hidden", height: "100%" }}>
              <Box sx={{ height: "calc(100% - 56px)", overflowY: "auto" }}>
                <NotificationWidget popup />
              </Box>
            </Paper>
          </Grow>
        </ClickAwayListener>
      </Popover>
      */}
    </Box>
  );
};

export default HomeDashBoard;
