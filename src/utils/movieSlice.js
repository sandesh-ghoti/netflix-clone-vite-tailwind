import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "movies",
  initialState: {
    trending: { today: null, week: null },
    upcoming: null,
    nowPlaying: null,
    popular: null,
    topRated: null,
  },
  reducers: {
    addTrending: (state, action) => {
      if (action.payload.period === "today") {
        state.trending.today = action.payload.data;
      } else {
        state.trending.week = action.payload.data;
      }
      return state;
    },
    addUpcoming: (state, action) => {
      state.upcoming = action.payload.data;
      return state;
    },
    addNowPlaying: (state, action) => {
      state.nowPlaying = action.payload.data;
      return state;
    },
    addPopular: (state, action) => {
      state.popular = action.payload.data;
      return state;
    },
    addTopRated: (state, action) => {
      state.topRated = action.payload.data;
      return state;
    },
    removeMovies: (state) => {
      state = null;
      return state;
    },
  },
});

export const {
  addNowPlaying,
  addPopular,
  addTopRated,
  addTrending,
  addUpcoming,
  removeMovies,
} = slice.actions;
export default slice.reducer;
