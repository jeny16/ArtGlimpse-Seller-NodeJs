// src/slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { format } from "date-fns";
import orderService from "../action/orderService";

const extractId = (idField) => {
  if (typeof idField === "object" && idField !== null) {
    if (idField.$oid) return idField.$oid;
    if (idField.date) return idField.date;
    return String(idField);
  }
  return idField;
};

// Thunk to fetch orders
export const fetchOrders = createAsyncThunk("orders/fetch", async (_, thunkAPI) => {
  try {
    const orders = await orderService.fetchOrders();
    // console.log("response inside fetchOrders:", orders);
    return orders; // ✅ only array of orders
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message || error?.message || "Failed to fetch orders"
    );
  }
});

// Thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, newStatus }, thunkAPI) => {
    try {
      const data = await orderService.updateOrderStatus({ orderId, newStatus });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message || "Failed to update order status"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        const orders = Array.isArray(action.payload) ? action.payload : [];

        state.orders = orders.map((order) => ({
          ...order,
          id: extractId(order.id),
          sellerId: order.sellerId ? extractId(order.sellerId) : null,
          userId: extractId(order.userId),
          status: order.status
            ? order.status
            : order.paymentStatus === "PAID"
            ? "New"
            : "Processing",
          createdAt: order.createdAt
            ? format(new Date(order.createdAt), "yyyy-MM-dd HH:mm:ss")
            : null,
          items: order.items.map((item) => ({
            ...item,
            productId: item.productId,
            orderRef: order.orderRef,
          })),
        }));
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to fetch orders";
      })

      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order.id === extractId(updatedOrder.id)
        );
        if (index !== -1) {
          state.orders[index] = {
            ...state.orders[index],
            status: updatedOrder.orderStatus,
            paymentStatus: updatedOrder.paymentStatus,
          };
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed to update order status";
      });
  },
});

export const selectOrders = (state) => state.orders.orders;
export const selectOrderStatus = (state) => state.orders.status;

export default orderSlice.reducer;
