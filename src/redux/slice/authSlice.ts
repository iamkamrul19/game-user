import { IAuthUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

interface AuthState {
  user: IAuthUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// lib/store/authSlice.ts
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      state.error = null;
    },
    setAuthUser(state, action: PayloadAction<IAuthUser>) {
      state.user = action.payload;
    },
    seIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setAuthError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        const { statusCode, success, data } = payload;
        if (statusCode === 200 && success) {
          state.user = data?.user ? data?.user : null;
        }
      }
    );
  },
});

export const { seIsAuthenticated, setAuthLoading, setAuthUser, setAuthError } =
  authSlice.actions;
export default authSlice.reducer;
