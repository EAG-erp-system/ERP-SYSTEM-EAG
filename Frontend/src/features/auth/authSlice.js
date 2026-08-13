import { createSlice } from "@reduxjs/toolkit";
import { login, fetchMe } from "./authThunks";

const storage = {
  getUser: () => JSON.parse(localStorage.getItem("user") || "null"),
  getToken: () => localStorage.getItem("token"),
  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  },
  setUser: (user) => localStorage.setItem("user", JSON.stringify(user)),
  clearAuth: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

const initialState = {
  user: storage.getUser(),
  token: storage.getToken(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      storage.clearAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Lifecycle
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        storage.setAuth(user, token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // FetchMe Lifecycle
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        storage.setUser(action.payload);
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.token = null;
        storage.clearAuth();
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
