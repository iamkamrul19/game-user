import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isGlobalLoading: boolean;
  isLanderLoading: boolean;
  globalError: string;
  isCartOpen: boolean;
  ip: string | null;
}

const initialState: State = {
  isGlobalLoading: true,
  isLanderLoading: false,
  globalError: "",
  isCartOpen: false,
  ip: "103.162.230.38",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.isGlobalLoading = action.payload;
    },
    setisLanderLoading(state, action: PayloadAction<boolean>) {
      state.isLanderLoading = action.payload;
    },
    setGlobalError(state, action: PayloadAction<string>) {
      state.globalError = action.payload;
    },
    setIsCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
    setIPAddress(state, action: PayloadAction<string | null>) {
      state.ip = action.payload;
    },
  },
});

export const {
  setGlobalLoading,
  setisLanderLoading,
  setGlobalError,
  setIsCartOpen,
  setIPAddress,
} = globalSlice.actions;
export default globalSlice.reducer;
