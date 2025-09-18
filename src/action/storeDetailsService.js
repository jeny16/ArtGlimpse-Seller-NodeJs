import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL}/seller/store`;

const storeDetailsService = {
    // Fetch store details for a seller using their ID (passed as userId to backend)
    fetchStoreDetails: async (sellerId) => {
        const response = await axios.get(BASE_URL, { params: { userId: sellerId } });
        return response.data;
    },
    // Update store details for a seller using their ID
    updateStoreDetails: async (sellerId, storeDetails) => {
        const response = await axios.put(BASE_URL, storeDetails, { params: { userId: sellerId } });
        return response.data;
    },
    // Delete store details for a seller
    deleteStoreDetails: async (sellerId) => {
        const response = await axios.delete(BASE_URL, { params: { userId: sellerId } });
        return response.data;
    },
};

export default storeDetailsService;
