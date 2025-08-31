import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Divider,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Stack,
  Badge,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShippingIcon from "@mui/icons-material/LocalShipping";
import PrintIcon from "@mui/icons-material/Print";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { ORDER_STATUS, getStatusChip, isValidTransition, allowedTransitions } from "./index";
import ProductCard from "./ProductCard";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

const OrderDetails = ({
  order,
  onClose = () => { },
  onStatusChange = () => { },
}) => {
  const theme = useTheme();
  // Local state to hold the updated status
  const [selectedStatus, setSelectedStatus] = useState(order.status || "");
  // console.log("orderdetails order::", order);
  useEffect(() => {
    // Reset the local status state if order changes
    setSelectedStatus(order.status || "");
  }, [order]);
  console.log("order::", order);

  if (!order) return null;

  const customer = order.userData || order.shippingAddress || {};

  // Handler for Save Changes button
  const handleSave = () => {
    if (selectedStatus === order.status) {
      onClose();
      return;
    }
    if (!isValidTransition(order.status, selectedStatus, order)) {
      toast.error(`Transition from "${order.status}" to "${selectedStatus}" is not allowed.`);
      return;
    }
    onStatusChange(order.id, selectedStatus);
    onClose();
  };

  // Handler for Cancel button: resets changes and navigates back
  const handleCancel = () => {
    setSelectedStatus(order.status);
    onClose();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "8px",
        overflow: "hidden",
        border: `1px solid ${theme.palette.shades.light}`,
      }}
    >
      {/* Header Banner */}
      <Box
        sx={{
          backgroundColor: theme.palette.custom.highlight,
          py: 2.5,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ReceiptIcon sx={{ color: "white", mr: 2, fontSize: 28 }} />
          <Box>
            <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
              {order.title || `Order #${order.id?.substring(0, 8) || "Unknown"}`}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  mr: 2,
                }}
              >
                <CalendarTodayIcon sx={{ fontSize: 14, mr: 0.5 }} />
                {order.createdAt || "N/A"}
              </Box>
              <Box component="span" sx={{ display: "inline-flex", alignItems: "center" }}>
                <Box
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    opacity: 0.9,
                  }}
                >
                  ID: {order.id?.substring(0, 12) || "Unknown"}
                </Box>
              </Box>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {getStatusChip(order.status || "Unknown")}
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column - Products */}
          <Grid item xs={12} md={7} lg={8}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                height: "100%",
                border: `1px solid ${theme.palette.shades.light}`,
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderBottom: `1px solid ${theme.palette.shades.light}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.custom.highlight,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.custom.highlight,
                      mr: 1.5,
                    }}
                  />
                  Products
                </Typography>
                <Tooltip title="Print Order Details">
                  <IconButton
                    size="small"
                    onClick={() => window.print()}
                    sx={{
                      color: theme.palette.custom.highlight,
                    }}
                  >
                    <PrintIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box
                sx={{
                  p: 0,
                  maxHeight: { xs: "300px", md: "450px" },
                  overflowY: "auto",
                }}
              >
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <Box
                      key={`product-${index}`}
                      sx={{
                        p: 2,
                        borderBottom:
                          index !== order.items.length - 1
                            ? `1px solid ${theme.palette.shades.light}`
                            : "none",
                      }}
                    >
                      <ProductCard key={item._id} item={item} />
                    </Box>
                  ))
                ) : (
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      No products in this order
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>

          {/* Right Column - Info Cards */}
          <Grid item xs={12} md={5} lg={4}>
            <Stack spacing={3}>
              {/* Customer Card */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.shades.light}`,
                  backgroundColor: "white",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: `1px solid ${theme.palette.shades.light}`,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.custom.highlight,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.custom.highlight,
                        mr: 1.5,
                      }}
                    />
                    Customer
                  </Typography>
                </Box>

                <CardContent sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: "#4caf50",
                            border: "2px solid white",
                          }}
                        />
                      }
                    >
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.custom.accent,
                          width: 50,
                          height: 50,
                          fontWeight: 700,
                          fontSize: 20,
                        }}
                      >
                        {customer?.username?.charAt(0) || "U"}
                      </Avatar>
                    </Badge>
                    <Box sx={{ ml: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.custom.highlight,
                        }}
                      >
                        {customer.username || "Unknown Customer"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {customer.email || "No email provided"}
                      </Typography>
                    </Box>
                  </Box>
                  <Stack spacing={1.5} sx={{ mt: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <EmailIcon
                        fontSize="small"
                        sx={{
                          color: theme.palette.custom.highlight,
                          mr: 1.5,
                        }}
                      />
                      <Typography variant="body2">
                        {customer.email || "No email provided"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <PhoneIcon
                        fontSize="small"
                        sx={{
                          color: theme.palette.custom.highlight,
                          mr: 1.5,
                        }}
                      />
                      <Typography variant="body2">
                        {customer.mobile || "No phone provided"}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Shipping Card */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.shades.light}`,
                  backgroundColor: "white",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: `1px solid ${theme.palette.shades.light}`,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.custom.highlight,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.custom.highlight,
                        mr: 1.5,
                      }}
                    />
                    Shipping
                  </Typography>
                </Box>

                <CardContent sx={{ p: 2 }}>
                  {order.shippingAddress ? (
                    <>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: theme.palette.tints.tint2,
                          border: `1px dashed ${theme.palette.shades.medium}`,
                          position: "relative",
                          mt: 1,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: -10,
                            right: -10,
                            width: 60,
                            height: 60,
                            backgroundColor: theme.palette.custom.highlight,
                            opacity: 0.08,
                            borderRadius: "50%",
                          }}
                        />
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                          {order.shippingAddress.name}
                        </Typography>
                        <Typography variant="body2" paragraph sx={{ mb: 1 }}>
                          {order.shippingAddress.street}
                        </Typography>
                        <Typography variant="body2">
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state} {order.shippingAddress.zip}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.5,
                            fontWeight: 500,
                            color: theme.palette.custom.highlight,
                          }}
                        >
                          {order.shippingAddress.country}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mt: 2,
                        }}
                      >
                        <ShippingIcon
                          fontSize="small"
                          sx={{
                            color: theme.palette.custom.highlight,
                            mr: 1,
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Standard Shipping
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ p: 2, textAlign: "center" }}>
                      <Typography variant="body2" color="text.secondary">
                        No shipping information available
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Footer Actions */}
          <Grid item xs={12}>
            <Divider sx={{ mb: 3, mt: 1, borderColor: theme.palette.shades.light }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                gap: { xs: 2, sm: 0 },
              }}
            >
              <FormControl
                size="small"
                sx={{
                  minWidth: { xs: "100%", sm: 250 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.highlight,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.custom.highlight,
                      borderWidth: 1,
                    },
                  },
                }}
              >
                <InputLabel
                  id="status-update-label"
                  sx={{
                    color: theme.palette.custom.highlight,
                    "&.Mui-focused": {
                      color: theme.palette.custom.highlight,
                    },
                    "&.MuiInputLabel-shrink": {
                      color: theme.palette.custom.highlight,
                    },
                  }}
                >
                  Update Status
                </InputLabel>
                <Select
                  labelId="status-update-label"
                  value={selectedStatus || "New"}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                  }}
                  label="Update Status"
                  sx={{ color: theme.palette.text.primary }}
                  MenuProps={{
                    PaperProps: {
                      elevation: 3,
                      sx: {
                        borderRadius: 2,
                        mt: 0.5,
                        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.highlight,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.highlight,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.custom.highlight,
                        },
                      },
                    },
                  }}
                >
                  {/* Only allow current status and valid forward transitions */}
                  {Object.values(ORDER_STATUS)
                    .filter((status) => {
                      if (status.value === order.status) return true;
                      // Only allow valid transitions (not reverse)
                      return isValidTransition(order.status, status.value, order) &&
                        allowedTransitions[order.status]?.indexOf(status.value) > -1 &&
                        Object.keys(ORDER_STATUS).findIndex(k => ORDER_STATUS[k].value === status.value) >=
                        Object.keys(ORDER_STATUS).findIndex(k => ORDER_STATUS[k].value === order.status);
                    })
                    .map((status) => (
                      <MenuItem
                        key={`status-option-${status.value}`}
                        value={status.value}
                        sx={{
                          py: 1.5,
                          "&:not(:last-child)": {
                            borderBottom: `1px solid ${theme.palette.shades.light}`,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{ color: `${status.color}.main`, mr: 1.5 }}>
                              {status.icon}
                            </Box>
                            <Typography variant="body2" fontWeight="500">
                              {status.value}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                            {status.description}
                          </Typography>
                        </Box>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <Button
                  onClick={handleCancel}
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
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    borderRadius: "4px",
                    px: 3,
                    py: 1,
                    backgroundColor: theme.palette.custom.highlight,
                    "&:hover": {
                      backgroundColor: theme.palette.custom.accent,
                    },
                    color: "white",
                    flex: { xs: 1, sm: "none" },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default OrderDetails;
