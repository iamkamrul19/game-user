import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import settingReducer from "./slice/settingSlice";
import globalReducer from "./slice/globalSlice";
import authReducer from "./slice/authSlice";
import checkoutReducer from "./slice/checkoutSlice";
export const store = configureStore({
  reducer: {
    global: globalReducer,
    settings: settingReducer,
    auth: authReducer,
    checkout: checkoutReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([api.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
