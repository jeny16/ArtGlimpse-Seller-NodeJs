import axios from './api'; // using the configured axios instance
const API_URL = 'http://localhost:3000/api/seller';

const sellerService = {
    getProfile: async (sellerId) => {
        try {
            // Send sellerId as userId to match backend expectations
            const response = await axios.get(`${API_URL}/profile`, { params: { userId: sellerId } });
            console.log("Get seller profile response:", response);
            return response.data;
        } catch (error) {
            console.log("Get seller profile error:", error);
            throw error.response?.data || 'Failed to get seller profile';
        }
    },

    updateProfile: async (sellerId, profileData) => {
        try {
            const response = await axios.put(`${API_URL}/profile`, profileData, { params: { userId: sellerId } });
            console.log("Update seller profile response:", response);
            return response.data;
        } catch (error) {
            console.log("Update seller profile error:", error);
            throw error.response?.data || 'Failed to update seller profile';
        }
    },

    deleteSeller: async (sellerId) => {
        try {
            const response = await axios.delete(`${API_URL}/profile`, { params: { userId: sellerId } });
            console.log("Delete seller response:", response);
            return response.data;
        } catch (error) {
            console.log("Delete seller error:", error);
            throw error.response?.data || 'Failed to delete seller';
        }
    }
};

export default sellerService;
