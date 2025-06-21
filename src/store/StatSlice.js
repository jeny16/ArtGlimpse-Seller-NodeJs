import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch stats with auth token
export const fetchStats = createAsyncThunk('stats/fetchStats', async (_, { rejectWithValue }) => {
  try {
    const userdata = JSON.parse(localStorage.getItem('seller'));
    const token = userdata?.token;

    const response = await axios.get('http://localhost:3000/api/stats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Stats Fetch Error:', error.response?.data || error.message);
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

const statSlice = createSlice({
  name: 'stats',
  initialState: {
    stats: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statSlice.reducer;
