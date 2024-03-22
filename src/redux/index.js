import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import appConfigReducer from "./appConfigSlice";
import { tmdbApi } from "./apis/tmdbApi";
const store = configureStore({
  reducer: {
    user: userReducer,
    appConfig: appConfigReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(tmdbApi.middleware);
  },
});

export * from "./apis/tmdbApi";
export default store;
