import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "tvShows",
  initialState: null,
  reducers: {
    addTVShows: (state, action) => {
      state = action.payload;
      return state;
    },
    removeTVShows: (state) => {
      state = null;
      return state;
    },
  },
});
export const { addTVShows, removeTVShows } = slice.actions;
export default slice.reducer;
