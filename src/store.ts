import { configureStore } from "@reduxjs/toolkit";
import likedRecipesSlice from "./features/likedRecipes/likedRecipesSlice";

const store = configureStore({
  reducer: { likedRecipes: likedRecipesSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
