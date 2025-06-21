import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sellerService from '../action/sellerService';

export const fetchSellerProfile = createAsyncThunk(
  'sellerProfile/fetch',
  async ({ sellerId }, thunkAPI) => {
    try {
      const data = await sellerService.getProfile(sellerId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message || 'Failed to fetch seller profile'
      );
    }
  }
);

export const updateSellerProfile = createAsyncThunk(
  'sellerProfile/update',
  async ({ sellerId, profileData }, thunkAPI) => {
    try {
      const data = await sellerService.updateProfile(sellerId, profileData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message || 'Failed to update seller profile'
      );
    }
  }
);

export const deleteSellerAccount = createAsyncThunk(
  'sellerProfile/delete',
  async ({ sellerId }, thunkAPI) => {
    try {
      const data = await sellerService.deleteSeller(sellerId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error?.message || 'Failed to delete seller account'
      );
    }
  }
);

const sellerProfileSlice = createSlice({
  name: 'sellerProfile',
  initialState: {
    sellerProfile: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetSellerProfileError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sellerProfile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateSellerProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sellerProfile = action.payload;
      })
      .addCase(updateSellerProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteSellerAccount.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteSellerAccount.fulfilled, (state) => {
        state.status = 'succeeded';
        state.sellerProfile = null;
      })
      .addCase(deleteSellerAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { resetSellerProfileError } = sellerProfileSlice.actions;
export default sellerProfileSlice.reducer;
