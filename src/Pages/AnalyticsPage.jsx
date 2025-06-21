import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
  Store as StoreIcon
} from '@mui/icons-material';

const SellerAnalytics = () => {
  const [timePeriod, setTimePeriod] = useState('monthly');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    productsSold: 0,
    conversionRate: 0,
    visitors: 0,
    revenueData: [],
    productPerformance: [],
    salesTimeline: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from your backend API (which returns dummy data from Mongo)
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/stats?timePeriod=${timePeriod}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        // Use fallback empty arrays if properties are missing
        // setStats({
        //   totalRevenue: data.totalRevenue,
        //   totalOrders: data.totalOrders,
        //   productsSold: data.productsSold || 0,
        //   conversionRate: data.conversionRate,
        //   visitors: data.visitors || 0,
        //   revenueData: data.revenueData || [],
        //   productPerformance: data.productPerformance || [],
        //   salesTimeline: data.salesTimeline || []
        // });
        setStats({
          totalRevenue: data.totalRevenue,
          totalOrders: data.totalOrders,
          productsSold: data.productsSold || 0,
          conversionRate: data.conversionRate,
          visitors: data.visitors || 0,
          revenueData: data.revenueData || [
            { name: "Jan", Revenue: 4000, Orders: 2400 },
            { name: "Feb", Revenue: 3000, Orders: 1398 }
          ],
          productPerformance: data.productPerformance || [
            { name: "Earrings", Sales: 400, Revenue: 2400 },
            { name: "Necklace", Sales: 300, Revenue: 1398 }
          ],
          salesTimeline: data.salesTimeline || [
            { date: "June 15", event: "Highest Daily Sales", amount: "₹5,400" },
            { date: "June 10", event: "New Product Launch", amount: "26 Units Sold" }
          ]
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [timePeriod]);

  if (loading) {
    return (
      <Box sx={{ mt: 16, p: 3 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 16, p: 3 }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default', my: 20, maxWidth: "lg",mx:"auto" }}>
      <Grid container spacing={3}>
        {/* Header and Time Period Selector */}
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="h4" gutterBottom>
              Sales Analytics
            </Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Period</InputLabel>
              <Select
                value={timePeriod}
                label="Time Period"
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        {/* Sales Overview Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Revenue
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <AttachMoneyIcon color="primary" />
                <Typography variant="h4">₹{stats.totalRevenue}</Typography>
                <Typography color="success.main">(+15.5%)</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Total Orders
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <StoreIcon color="primary" />
                <Typography variant="h4">{stats.totalOrders}</Typography>
                <Typography color="success.main">(+22.3%)</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Conversion Rate
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <TrendingUpIcon color="primary" />
                <Typography variant="h4">{stats.conversionRate}%</Typography>
                <Typography color="success.main">(+5.2%)</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue and Orders Trend
              </Typography>
              {stats.revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Revenue" fill="#8884d8" />
                    <Bar dataKey="Orders" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No revenue data available.
                </Typography>
              )}
              {console.log("jeihu", stats.revenueData.length)}
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Timeline */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Sales Events
              </Typography>
              {stats.salesTimeline.length > 0 ? (
                <Timeline>
                  {stats.salesTimeline.map((item, index) => (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent color="text.secondary">
                        {item.date}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot>
                          <TrendingUpIcon color="success" />
                        </TimelineDot>
                        {index < stats.salesTimeline.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body2">{item.event}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.amount}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No timeline events available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Product Performance */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Performance
              </Typography>
              {stats.productPerformance.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.productPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Sales" fill="#8884d8" />
                    <Bar dataKey="Revenue" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No product performance data available.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SellerAnalytics;
