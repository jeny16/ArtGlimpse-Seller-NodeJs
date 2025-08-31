import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Chip,
    alpha,
    useTheme,
    Tooltip,
} from "@mui/material";
import { getStatusChip } from "../components/ordersStatus";
import { KeyboardArrowRight as ArrowIcon } from "@mui/icons-material";

const calculateTotal = (items) => {
    if (!items || !Array.isArray(items)) return "0.00";
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
};

const OrderTable = ({ orders, page, rowsPerPage, onRowClick, onStatusChange }) => {
    const theme = useTheme();

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            variant="outlined"
            sx={{
                borderRadius: "12px",
                overflow: "hidden",
                my: 4,
                // minHeight: "70vh",
                border: `1px solid ${alpha(theme.palette.custom.highlight, 0.15)}`,
                boxShadow: `0 4px 16px ${alpha("#000", 0.03)}`,
            }}
        >
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow sx={{
                        background: `linear-gradient(to right, ${alpha(theme.palette.custom.highlight, 0.08)}, ${alpha(theme.palette.custom.highlight, 0.08)})`,
                    }}>
                        <TableCell sx={{
                            fontWeight: 600,
                            color: theme.palette.neutral.main,
                            py: 2.5,
                            fontSize: "0.95rem",
                            letterSpacing: "0.02em",
                        }}>Order ID</TableCell>
                        <TableCell sx={{
                            fontWeight: 600,
                            color: theme.palette.neutral.main,
                            py: 2.5,
                            fontSize: "0.95rem",
                            letterSpacing: "0.02em",
                        }}>Customer / Title</TableCell>
                        <TableCell sx={{
                            fontWeight: 600,
                            color: theme.palette.neutral.main,
                            py: 2.5,
                            fontSize: "0.95rem",
                            letterSpacing: "0.02em",
                        }}>Date</TableCell>
                        <TableCell sx={{
                            fontWeight: 600,
                            color: theme.palette.neutral.main,
                            py: 2.5,
                            fontSize: "0.95rem",
                            letterSpacing: "0.02em",
                        }}>Items</TableCell>
                        <TableCell sx={{
                            fontWeight: 600,
                            color: theme.palette.neutral.main,
                            py: 2.5,
                            fontSize: "0.95rem",
                            letterSpacing: "0.02em",
                        }}>Total</TableCell>
                        <TableCell sx={{
                            fontWeight: 600,
                            color: theme.palette.neutral.main,
                            py: 2.5,
                            fontSize: "0.95rem",
                            letterSpacing: "0.02em",
                        }}>Status</TableCell>
                        <TableCell sx={{
                            fontWeight: 600,
                            color: theme.palette.neutral.main,
                            py: 2.5,
                            fontSize: "0.95rem",
                            letterSpacing: "0.02em",
                        }}>Payment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((order) => {
                            const orderId = order._id || "N/A";
                            const orderTitle =
                                order.title ||
                                (order.shippingAddress?.name
                                    ? `${order.shippingAddress.name}`
                                    : `Order #${orderId.substring(0, 8)}`);
                            const orderItems = order.items || [];
                            const orderDate = order.createdAt || "N/A";
                            const orderTotal = calculateTotal(orderItems);
                            const orderStatus = order.status;
                            const paymentStatus = order.paymentStatus || "Pending";

                            return (
                                <TableRow
                                    key={orderId}
                                    sx={{
                                        position: "relative",
                                        "&:hover": {
                                            bgcolor: alpha(theme.palette.custom.highlight, 0.04),
                                            "& .row-arrow": { opacity: 1, right: 12 }
                                        },
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                                    }}
                                    onClick={() => onRowClick(order)}
                                >
                                    <TableCell
                                        sx={{
                                            fontFamily: "monospace",
                                            fontWeight: 600,
                                            whiteSpace: "nowrap",
                                            color: theme.palette.secondary.dark,
                                            py: 2.5
                                        }}
                                    >
                                        {orderId.substring(0, 8)}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            fontWeight="medium"
                                            sx={{ color: theme.palette.neutral.main }}
                                        >
                                            {orderTitle}
                                        </Typography>
                                        {order.description && (
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{ display: "block", mt: 0.5 }}
                                            >
                                                {order.description}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: theme.palette.neutral.main }}
                                        >
                                            {orderDate}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ maxWidth: 250 }}>
                                            {orderItems.slice(0, 2).map((item, index) => (
                                                <Typography
                                                    key={`${orderId}-item-${index}`}
                                                    variant="body2"
                                                    noWrap
                                                    sx={{
                                                        mb: index === 0 && orderItems.length > 1 ? 0.5 : 0,
                                                        color: theme.palette.neutral.main
                                                    }}
                                                >
                                                    {item.productName || item.name || `Item ${index + 1}`}
                                                    <span style={{
                                                        color: theme.palette.secondary.main,
                                                        fontSize: '0.9em',
                                                        marginLeft: '4px'
                                                    }}>
                                                        (Qty: {item.quantity})
                                                    </span>
                                                </Typography>
                                            ))}
                                            {orderItems.length > 2 && (
                                                <Tooltip title={orderItems.slice(2).map(item =>
                                                    `${item.productName || item.name || 'Item'} (Qty: ${item.quantity})`
                                                ).join(', ')}>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            cursor: "pointer",
                                                            color: theme.palette.custom.highlight,
                                                            mt: 0.5,
                                                            fontWeight: 500,
                                                            '&:hover': {
                                                                textDecoration: 'underline'
                                                            }
                                                        }}
                                                    >
                                                        +{orderItems.length - 2} more items
                                                    </Typography>
                                                </Tooltip>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            sx={{ color: theme.palette.custom.accent }}
                                        >
                                            ₹{orderTotal}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{getStatusChip(orderStatus)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={paymentStatus}
                                            color={paymentStatus === "PAID" ? "success" : "warning"}
                                            size="small"
                                            sx={{
                                                fontWeight: 500,
                                                px: 0.5,
                                                '& .MuiChip-label': {
                                                    px: 1
                                                },
                                                fontSize: '0.8rem'
                                            }}
                                        />
                                        <ArrowIcon
                                            className="row-arrow"
                                            sx={{
                                                position: 'absolute',
                                                right: 18,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: theme.palette.custom.highlight,
                                                opacity: 0,
                                                transition: 'all 0.3s ease'
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderTable;