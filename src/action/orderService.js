// src/action/orderService.js
import axios from './api';
const API_URL = 'http://localhost:3000/api/orders';

const orderService = {
  fetchOrders: async () => {
    const storedUser = JSON.parse(localStorage.getItem("seller"));
    const token = storedUser?.token;
    const sellerId = storedUser?.userId;
    if (!token || !sellerId) {
      throw "Missing authentication or seller ID.";
    }
    const response = await axios.get(`${API_URL}/seller/${sellerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.orders; // ✅ return only the array of orders
  },

  updateOrderStatus: async ({ orderId, newStatus }) => {
    const storedUser = JSON.parse(localStorage.getItem("seller"));
    const token = storedUser?.token;
    if (!token) {
      throw "Unauthorized: No token found.";
    }
    const response = await axios.patch(`${API_URL}/${orderId}`, newStatus, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    });
    return response.data;
  },
};

export default orderService;
