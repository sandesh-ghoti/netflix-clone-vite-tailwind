import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import tvReducer from "./tvSlice";
import appConfigReducer from "./appConfigSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    tvShows: tvReducer,
    movies: movieReducer,
    appConfig: appConfigReducer,
  },
});

export default store;
