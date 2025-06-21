import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import inventorySlice from "./inventorySlice";
import addProductReducer from "./addProductSlice";
import statsReducer from "./StatSlice";
import ordersReducer from "./orderSlice"; 
import sellerProfileReducer from "./SellerProfileSlice";
import storeDetailsReducer from "./StoreDetailsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        inventory: inventorySlice,
        addProduct: addProductReducer,
        stats: statsReducer,
        orders: ordersReducer,
        sellerProfile: sellerProfileReducer,
        storeDetails: storeDetailsReducer 
    },
});

export default store;
