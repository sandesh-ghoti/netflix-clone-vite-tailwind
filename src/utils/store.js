import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import tvReducer from "./tvSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    tvShows: tvReducer,
    movies: movieReducer,
  },
});

export default store;
