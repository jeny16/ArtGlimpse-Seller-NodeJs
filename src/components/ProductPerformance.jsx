import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  LinearProgress,
  Divider,
  Button,
  useTheme
} from '@mui/material';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductPerformance = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // Sample data - in a real application this would come from props or an API
  const products = [
  {
    id: 1,
    name: "Poornima Handmade Necklace with Earring and Mangtika",
    sales: 20,
    revenue: 6656,
    trend: 'up',
    performance: 85,
    image: "https://phuljhadi.com/cdn/shop/files/Phuljhadi0198-copy_800x.jpg?v=1734599555"
  },
  {
    id: 2,
    name: "Handcrafted Wooden",
    sales: 18,
    revenue: 2499,
    trend: 'down',
    performance: 70,
    image: "https://pineconeindia.in/cdn/shop/products/IMG_1312_1296x.jpg?v=1640097344"
  },
  {
    id: 3,
    name: "Juniper pastel choker",
    sales: 22,
    revenue: 2322,
    trend: 'up',
    performance: 78,
    image: "https://phuljhadi.com/cdn/shop/files/Phuljhadi0184-copy_800x.jpg?v=1734599861"
  },
  {
    id: 4,
    name: "Handcrafted Laundry baskets/ Multi Utility Baskets with lid and handles",
    sales: 15,
    revenue: 6867,
    trend: 'up',
    performance: 80,
    image: "https://pineconeindia.in/cdn/shop/products/Laundrybaskets10_1296x.jpg?v=1648878120"
  },
  {
    id: 5,
    name: "Noopur necklace set",
    sales: 19,
    revenue: 2399,
    trend: 'down',
    performance: 65,
    image: "https://phuljhadi.com/cdn/shop/files/0J7A6450copy_ea211694-1d30-4a0d-9b36-4cf8ed81e004_1000x.jpg?v=1737916527"
  },
  {
    id: 6,
    name: "Handcrafted Kauna grass Planters in diagonal weave",
    sales: 10,
    revenue: 1199,
    trend: 'up',
    performance: 50,
    image: "https://pineconeindia.in/cdn/shop/products/Planter12_1_1296x.jpg?v=1646792626"
  }
  // Add more products here as needed using the same format
];


  return (
    <Card sx={{ height: '100%', boxShadow: 2, display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title="Top Performing Products"
        subheader="Based on sales and revenue"
        sx={{ pb: 1 }}
      />
      <Divider />
      <CardContent sx={{ pt: 1, pb: 0, flexGrow: 1, overflow: 'auto' }}>
        <List sx={{ width: '100%' }}>
          {products.map((product) => (
            <ListItem
              key={product.id}
              alignItems="flex-start"
              sx={{
                px: 0,
                py: 1.5,
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': {
                  borderBottom: 'none'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={product.name}
                  src={product.image}
                  variant="rounded"
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle2" fontWeight={600}>
                    {product.name}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        fontWeight={500}
                        sx={{ mr: 2 }}
                      >
                        ₹{product.revenue.toLocaleString()}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mr: 1 }}
                      >
                        {product.sales} sold
                      </Typography>
                      {product.trend === 'up' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                          <TrendingUp size={16} />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>
                            12%
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                          <TrendingDown size={16} />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>
                            8%
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 1 }}>
                      <Box sx={{ flexGrow: 1, mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={product.performance}
                          sx={{
                            height: 6,
                            borderRadius: 1,
                            backgroundColor: 'action.hover',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor:
                                product.performance > 70 ? 'success.main' :
                                  product.performance > 50 ? 'warning.main' : 'error.main'
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {product.performance}%
                      </Typography>
                    </Box>
                  </React.Fragment>
                }
                secondaryTypographyProps={{ component: 'div' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Box sx={{ p: 2, pt: 0, mx: 'auto' }}>
        <Button
          variant="outlined"
          // fullWidth
          startIcon={<Eye size={16} />}
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
          onClick={() => navigate('/inventory')}
        >
          View All Products
        </Button>
      </Box>
    </Card>
  );
};

export default ProductPerformance;
