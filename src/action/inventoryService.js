import axios from "axios";

const API_URL = "http://localhost:3000/api/products";

const inventoryService = {
  // Fetch inventory for the logged‑in seller by path‑param
  getInventory: async (sellerId) => {
    try {
      // ⚠️ Use the new path style, not query params
      const { data } = await axios.get(`${API_URL}/seller/${sellerId}`);
      
      // If your handler returns { success, products }, pull out the array:
      const products = Array.isArray(data)
        ? data
        : data.products || data;

      // (Optional) strip out any nested $oid if you still need to:
      return products.map((product) => {
        if (
          product.seller &&
          typeof product.seller === "object" &&
          product.seller.$oid
        ) {
          product.seller = product.seller.$oid;
        }
        return product;
      });
    } catch (error) {
      // Surface the backend message or a fallback
      throw error.response?.data || "Failed to fetch inventory";
    }
  },

  // Update product details (Categories, Stock, Price)
  updateProduct: async (id, updatedFields, sellerId) => {
    try {
      // If you want to enforce ownership, you can pass sellerId as a query param,
      // or better yet, verify it inside your controller/service.
      const { data } = await axios.patch(
        `${API_URL}/${id}`,
        updatedFields,
        { params: { sellerId } }
      );
      return data;
    } catch (error) {
      throw error.response?.data || "Failed to update product";
    }
  },

  // Delete a product
  deleteProduct: async (id) => {
    try {
      const { data } = await axios.delete(`${API_URL}/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data || "Failed to delete product";
    }
  },
};

export default inventoryService;
