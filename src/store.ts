import { configureStore } from "@reduxjs/toolkit";
import likedRecipesSlice from "./features/likedRecipes/likedRecipesSlice";
import authSlice from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    likedRecipes: likedRecipesSlice,
    auth: authSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
