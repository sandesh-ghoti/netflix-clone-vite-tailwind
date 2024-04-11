import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

export const getMyInfo = createAsyncThunk("user/getMyInfo", async () => {
  try {
    const response = await axiosClient.get("user/getUserInfo");
    console.log(response);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (body) => {
    try {
      const response = await axiosClient.put("user/updateProfile", body);
      console.log(response);
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);
const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    myProfile: null,
    toastData: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload.user;
      });
  },
});

export const { setLoading, showToast } = appConfigSlice.actions;

export default appConfigSlice.reducer;
