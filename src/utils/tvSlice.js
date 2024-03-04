import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "tvShows",
  initialState: {
    trending: { today: null, week: null },
    airingToday: null,
    onTheAir: null,
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
    addAiringToday: (state, action) => {
      state.airingToday = action.payload.data;
      return state;
    },
    addOTA: (state, action) => {
      state.onTheAir = action.payload.data;
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
    removeTVShows: (state) => {
      state = null;
      return state;
    },
  },
});
export const {
  addTrending,
  addAiringToday,
  addOTA,
  addPopular,
  addTopRated,
  removeTVShows,
} = slice.actions;
export default slice.reducer;
