import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch launches with pagination and search
export const fetchLaunches = createAsyncThunk(
  'launches/fetchLaunches',
  async ({ searchQuery = '', offset = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}${
          searchQuery && `&mission_name=${searchQuery}`
        }`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch launches');
      }
      return response.json(); // Return the array of launches
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const launchesSlice = createSlice({
  name: 'launches',
  initialState: {
    launches: [],
    loading: false,
    error: null,
    hasMore: true, // To track if there are more results
    searchQuery: '', // Current search query
    offset: 0, // Current offset for pagination
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.offset = 0; // Reset offset when a new search query is set
      state.launches = []; // Clear launches for new search results
      state.hasMore = true; // Reset infinite scrolling state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.loading = false;

        // Append new unique launches
        const newLaunches = action.payload.filter(
          (item) =>
            !state.launches.some(
              (launch) => launch.flight_number === item.flight_number
            )
        );

        state.launches = [...state.launches, ...newLaunches];
        state.offset += action.payload.length; // Update offset

        // Set `hasMore` to false if fewer results than the limit are returned
        // or if no results are returned
        if (action.payload.length < 10) {
          state.hasMore = false;
        }
      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery } = launchesSlice.actions;

export default launchesSlice.reducer;
