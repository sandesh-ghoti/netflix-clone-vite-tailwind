import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "movies",
  initialState: null,
  reducers: {
    addMovies: (state, action) => {
      state = action.payload;
      return state;
    },
    removeMovies: (state) => {
      state = null;
      return state;
    },
  },
});

export const { addMovies, removeMovies } = slice.actions;
export default slice.reducer;
