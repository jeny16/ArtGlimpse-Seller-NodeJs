import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import inventoryService from "../action/inventoryService";

const initialState = {
    inventoryItems: [],
    inventoryItem: null,
    isLoading: false,
    error: null,
};

// Fetch inventory using sellerId
export const fetchInventory = createAsyncThunk(
    "inventory/fetchAll",
    async (sellerId, thunkAPI) => {
        try {
            console.log("inventoryService.getInventory(sellerId)", await inventoryService.getInventory(sellerId))
            return await inventoryService.getInventory(sellerId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Update product thunk
export const updateProduct = createAsyncThunk(
    "inventory/updateProduct",
    async ({ id, update, sellerId }, thunkAPI) => {
        try {
            return await inventoryService.updateProduct(id, update, sellerId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Delete product thunk
export const deleteProduct = createAsyncThunk(
    "inventory/deleteProduct",
    async (id, thunkAPI) => {
        try {
            return await inventoryService.deleteProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        clearInventory: (state) => {
            state.inventoryItem = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.inventoryItems = action.payload;
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.inventoryItems = state.inventoryItems.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.inventoryItems = state.inventoryItems.filter(
                    (item) => item.id !== action.meta.arg
                );
            });
    },
});

export const { clearInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
