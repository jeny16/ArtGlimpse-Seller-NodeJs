import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createProductAPI,
  updateProductAPI
} from '../action/productService';

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (formData, thunkAPI) => {
    try {
      return await createProductAPI(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Failed to add product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ id, update }, thunkAPI) => {
    try {
      return await updateProductAPI(id, update);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Failed to update product');
    }
  }
);

const addProductSlice = createSlice({
  name: 'product',
  initialState: {
    product: null,
    isLoading: false,
    error: null,
    success: false
  },
  reducers: {
    resetAddProductState: (state) => {
      state.product = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (s) => { s.isLoading = true; s.error = null; s.success = false; })
      .addCase(createProduct.fulfilled, (s, a) => { s.product = a.payload; s.isLoading = false; s.success = true; })
      .addCase(createProduct.rejected, (s, a) => { s.isLoading = false; s.error = a.payload; })

      .addCase(updateProduct.pending, (s) => { s.isLoading = true; s.error = null; s.success = false; })
      .addCase(updateProduct.fulfilled, (s, a) => { s.product = a.payload; s.isLoading = false; s.success = true; })
      .addCase(updateProduct.rejected, (s, a) => { s.isLoading = false; s.error = a.payload; });
  }
});

export const { resetAddProductState } = addProductSlice.actions;
export default addProductSlice.reducer;
