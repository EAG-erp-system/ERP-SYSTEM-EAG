import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, fetchMeRequest } from "./authAPI";

const getErrorMessage = (error) => 
  error.response?.data?.message || error.message || "Something went wrong";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginRequest(credentials);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchMeRequest();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
