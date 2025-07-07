import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createProductAPI,
  updateProductAPI,
  deleteProductAPI
} from '../action/productService';

// Thunks
export const createProduct = createAsyncThunk(
  'product/create',
  async (formData, thunkAPI) => {
    try {
      return await createProductAPI(formData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ id, update }, thunkAPI) => {
    try {
      return await updateProductAPI(id, update);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id, thunkAPI) => {
    try {
      return await deleteProductAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const slice = createSlice({
  name: 'product',
  initialState: {
    product: null,
    isLoading: false,
    error: null,
    success: false
  },
  reducers: {
    resetProductState(state) {
      state.product = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createProduct.pending, (s) => { s.isLoading = true; s.error = null; s.success = false; })
      .addCase(createProduct.fulfilled, (s, a) => { s.product = a.payload; s.isLoading = false; s.success = true; })
      .addCase(createProduct.rejected,  (s, a) => { s.isLoading = false; s.error = a.payload; })

      // UPDATE
      .addCase(updateProduct.pending, (s) => { s.isLoading = true; s.error = null; s.success = false; })
      .addCase(updateProduct.fulfilled, (s, a) => { s.product = a.payload; s.isLoading = false; s.success = true; })
      .addCase(updateProduct.rejected,  (s, a) => { s.isLoading = false; s.error = a.payload; })

      // DELETE
      .addCase(deleteProduct.pending, (s) => { s.isLoading = true; s.error = null; s.success = false; })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.isLoading = false;
        s.success = true;
        // optionally clear s.product if the deleted one was loaded
        if (s.product && s.product.id === a.meta.arg) {
          s.product = null;
        }
      })
      .addCase(deleteProduct.rejected, (s, a) => { s.isLoading = false; s.error = a.payload; });
  }
});

export const { resetProductState } = slice.actions;
export default slice.reducer;
