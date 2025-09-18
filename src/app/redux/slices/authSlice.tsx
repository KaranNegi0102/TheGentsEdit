"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface USER_DATA_TYPE {
  id: number;
  name: string; 
  email: string;
  phone_number?: string;  
  address?: string;
  role: string;
}

interface AuthState {
  isLoggedIn: boolean;
  userData: USER_DATA_TYPE | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userData: null,
  loading: false,
  error: null,
};


export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("fetching user data...");

      const response = await axios.get(`/api/auth/checkUser`, {
        withCredentials: true,
      });

      // console.log("response in fetchUserData hahaha --> ", response);

      return response.data.user;
    } catch (error: unknown) {
      console.log("error", error);
      return rejectWithValue("Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;