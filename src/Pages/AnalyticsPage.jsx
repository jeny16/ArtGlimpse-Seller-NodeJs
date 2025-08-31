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

const staticStats = {
  totalRevenue: 124000,
  totalOrders: 3200,
  productsSold: 2100,
  conversionRate: 7.2,
  visitors: 18000,
  revenueData: [
    { name: "Jan", Revenue: 40000, Orders: 1200 },
    { name: "Feb", Revenue: 32000, Orders: 900 },
    { name: "Mar", Revenue: 52000, Orders: 1100 },
    { name: "Apr", Revenue: 30000, Orders: 800 },
  ],
  productPerformance: [
    { name: "Earrings", Sales: 800, Revenue: 24000 },
    { name: "Necklace", Sales: 600, Revenue: 18000 },
    { name: "Bracelet", Sales: 400, Revenue: 12000 },
  ],
  salesTimeline: [
    { date: "Aug 20", event: "Highest Daily Sales", amount: "₹15,400" },
    { date: "Aug 10", event: "New Product Launch", amount: "120 Units Sold" },
    { date: "Jul 28", event: "Reached 3K Orders", amount: "3,000 Orders" },
  ]
};


const AnalyticsStaticLayout = () => (
  <Box sx={{ flexGrow: 1, p: { xs: 1, md: 4 }, background: 'linear-gradient(135deg, #fdf7ed 0%, #fefaf4 100%)', my: 20, maxWidth: '1400px', mx: 'auto', borderRadius: 4, boxShadow: 3 }}>
    <Grid container spacing={3}>
      {/* Header */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'custom.highlight', fontFamily: 'Raleway, sans-serif', letterSpacing: 1 }}>
            Sales Analytics
          </Typography>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Period</InputLabel>
            <Select value="monthly" label="Time Period" disabled>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Grid>

      {/* Sales Overview Cards */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderLeft: '4px solid', borderColor: 'custom.highlight', boxShadow: 2, minWidth: 260 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">Total Revenue</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <AttachMoneyIcon color="primary" fontSize="large" />
                  <Typography variant="h4">₹{staticStats.totalRevenue.toLocaleString()}</Typography>
                  <Typography color="success.main">(+15.5%)</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderLeft: '4px solid', borderColor: 'custom.highlight', boxShadow: 2, minWidth: 260 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">Total Orders</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <StoreIcon color="primary" fontSize="large" />
                  <Typography variant="h4">{staticStats.totalOrders.toLocaleString()}</Typography>
                  <Typography color="success.main">(+22.3%)</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderLeft: '4px solid', borderColor: 'custom.highlight', boxShadow: 2, minWidth: 260 }}>
              <CardContent>
                <Typography variant="h6" color="text.secondary">Conversion Rate</Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <TrendingUpIcon color="primary" fontSize="large" />
                  <Typography variant="h4">{staticStats.conversionRate}%</Typography>
                  <Typography color="success.main">(+5.2%)</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      {/* Revenue Chart & Timeline */}
      <Grid item xs={12} md={8}>
        <Card sx={{ boxShadow: 2, height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Revenue and Orders Trend</Typography>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={staticStats.revenueData} barGap={8} barCategoryGap={32}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis width={70} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Revenue" fill="#8884d8" radius={[8, 8, 0, 0]} barSize={40} />
                <Bar dataKey="Orders" fill="#82ca9d" radius={[8, 8, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ boxShadow: 2, height: '100%' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Recent Sales Events</Typography>
            <Timeline>
              {staticStats.salesTimeline.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent color="text.secondary">{item.date}</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot>
                      <TrendingUpIcon color="success" />
                    </TimelineDot>
                    {index < staticStats.salesTimeline.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="body2">{item.event}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.amount}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      </Grid>

      {/* Product Performance */}
      <Grid item xs={12}>
        <Card sx={{ boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Product Performance</Typography>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={staticStats.productPerformance} barGap={12} barCategoryGap={40}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis width={70} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Sales" fill="#8884d8" radius={[8, 8, 0, 0]} barSize={40} />
                <Bar dataKey="Revenue" fill="#82ca9d" radius={[8, 8, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default AnalyticsStaticLayout;
