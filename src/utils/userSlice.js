import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
      return state;
    },
    removeUser: (state, action) => {
      state = null;
      return state;
    },
  },
});

export const { addUser, removeUser } = slice.actions;
export default slice.reducer;
