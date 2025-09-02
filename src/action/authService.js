import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const authService = {
    // Seller login (uses dedicated seller endpoint)
    sellerLogin: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/seller/login`, { 
                email, 
                password    
            });
            if (response.data.token) {
                localStorage.setItem('seller', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || 'Failed to login as seller';
        }
    },

    // Seller signup (uses dedicated seller endpoint)
    sellerSignup: async (username, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/seller/signup`, {
                username,
                email,
                password
            });
            // Auto-login after signup for seller
            if (response.config.data) {
                const data = JSON.parse(response.config.data);
                await authService.sellerLogin(data.email, data.password);
            }
            return JSON.parse(response.config.data);
        } catch (error) {
            throw error.response?.data?.message || 'Failed to register as seller';
        }
    },

    logout: () => {
        localStorage.removeItem('seller');
    }
};

export default authService;