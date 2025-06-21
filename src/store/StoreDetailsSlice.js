// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import storeDetailsService from '../action/storeDetailsService';

// // Thunk to fetch store details
// export const fetchStoreDetails = createAsyncThunk(
//   'storeDetails/fetch',
//   async (sellerId, { rejectWithValue }) => {
//     try {
//       const data = await storeDetailsService.fetchStoreDetails(sellerId);
//       console.log('Fetched store details:', data); // Debugging line
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch store details');
//     }
//   }
// );

// // Thunk to update store details
// export const updateStoreDetails = createAsyncThunk(
//   'storeDetails/update',
//   async ({ sellerId, storeDetails }, { rejectWithValue }) => {
//     try {
//       const data = await storeDetailsService.updateStoreDetails(sellerId, storeDetails);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to update store details');
//     }
//   }
// );

// // Thunk to delete store details (if needed)
// export const deleteStoreDetails = createAsyncThunk(
//   'storeDetails/delete',
//   async (sellerId, { rejectWithValue }) => {
//     try {
//       const data = await storeDetailsService.deleteStoreDetails(sellerId);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to delete store details');
//     }
//   }
// );

// const storeDetailsSlice = createSlice({
//   name: 'storeDetails',
//   initialState: {
//     details: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStoreDetails.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchStoreDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.details = action.payload;
//       })
//       .addCase(fetchStoreDetails.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(updateStoreDetails.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(updateStoreDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.details = action.payload;
//       })
//       .addCase(updateStoreDetails.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(deleteStoreDetails.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(deleteStoreDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.details = null;
//       })
//       .addCase(deleteStoreDetails.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// export default storeDetailsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storeDetailsService from '../action/storeDetailsService';

// Thunk to fetch store details; returns null if details not found (404) for new sellers.
export const fetchStoreDetails = createAsyncThunk(
  'storeDetails/fetch',
  async (sellerId, { rejectWithValue }) => {
    try {
      const data = await storeDetailsService.fetchStoreDetails(sellerId);
      console.log('Fetched store details:', data);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Store details not found, returning null.');
        return null;
      }
      return rejectWithValue(error.response?.data || 'Failed to fetch store details');
    }
  }
);

// Thunk to update store details
export const updateStoreDetails = createAsyncThunk(
  'storeDetails/update',
  async ({ sellerId, storeDetails }, { rejectWithValue }) => {
    try {
      const data = await storeDetailsService.updateStoreDetails(sellerId, storeDetails);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update store details');
    }
  }
);

// Thunk to delete store details (if needed)
export const deleteStoreDetails = createAsyncThunk(
  'storeDetails/delete',
  async (sellerId, { rejectWithValue }) => {
    try {
      const data = await storeDetailsService.deleteStoreDetails(sellerId);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete store details');
    }
  }
);

const storeDetailsSlice = createSlice({
  name: 'storeDetails',
  initialState: {
    details: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStoreDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchStoreDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(updateStoreDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateStoreDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(updateStoreDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteStoreDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteStoreDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = null;
      })
      .addCase(deleteStoreDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default storeDetailsSlice.reducer;
