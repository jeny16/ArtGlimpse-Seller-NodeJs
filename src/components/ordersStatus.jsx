import React from "react";
import { Chip, Box } from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FiberNewIcon from "@mui/icons-material/FiberNew";

const ORDER_STATUS = {
  NEW: {
    value: "New",
    color: "primary",
    icon: <FiberNewIcon fontSize="small" sx={{ color: "custom.highlight" }}/>,
  },
  PENDING: {
    value: "Pending",
    color: "warning",
    icon: <PendingIcon fontSize="small" />,
  },
  PROCESSING: {
    value: "Processing",
    color: "secondary",
    icon: <InventoryIcon fontSize="small" />,
  },
  SHIPPED: {
    value: "Shipped",
    color: "info",
    icon: <LocalShippingIcon fontSize="small" />,
  },
  DELIVERED: {
    value: "Delivered",
    color: "success",
    icon: <CheckCircleIcon fontSize="small" />,
  },
  CANCELLED: {
    value: "Cancelled",
    color: "error",
    icon: <CancelIcon fontSize="small" />,
  }
};

const getStatusChip = (orderStatus) => {
  const statusConfig =
    Object.values(ORDER_STATUS).find(
      (config) => config.value === orderStatus
    ) || {
      value: orderStatus,
      color: "default",
      icon: <HelpOutlineIcon fontSize="small" />,
      description: "Unknown status",
    };

  return (
    <Box sx={{ display: "inline-flex", alignItems: "start" }}>
      <Chip
        icon={statusConfig.icon}
        label={statusConfig.value}
        color={statusConfig.color}
        size="small"
        sx={{
          "& .MuiChip-icon": {
            marginLeft: "5px",
          },
        }}
      />
    </Box>
  );
};

const allowedTransitions = {
  New: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "PAID"],
  Pending: ["Processing", "Shipped", "Delivered", "Cancelled", "PAID"],
  Processing: ["Shipped", "Delivered", "Cancelled"],
  Shipped: ["Delivered", "Cancelled"],
  Delivered: [],
  Cancelled: [],
};

const isValidTransition = (currentStatus, newStatus, order) => {
  if (currentStatus === newStatus) return true;
  if (["Delivered", "Cancelled"].includes(currentStatus)) return false;
  const allowed = allowedTransitions[currentStatus] || [];
  if (!allowed.includes(newStatus)) return false;
  if (newStatus === "Delivered") {
    if (!order.items || order.items.length === 0) return false;
    if (!order.shippingAddress) return false;
  }
  return true;
};

export { ORDER_STATUS, getStatusChip, allowedTransitions, isValidTransition };
