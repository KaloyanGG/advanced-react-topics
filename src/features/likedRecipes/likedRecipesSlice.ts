import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";

type LikedRecipesState = {
  ids: string[];
};

const initialState: LikedRecipesState = {
  ids: getFromLocalStorage("likedRecipesIds") || [],
};

const likedRecipesSlice = createSlice({
  name: "likedRecipes",
  initialState,
  reducers: {
    toggleLike: (state, { payload: actionId }: PayloadAction<string>) => {
      if (state.ids.includes(actionId)) {
        state.ids = state.ids.filter((id) => id !== actionId);
      } else {
        state.ids = [...state.ids, actionId];
      }
      saveToLocalStorage("likedRecipesIds", state.ids);
    },
  },
});

export default likedRecipesSlice.reducer;

export const { toggleLike } = likedRecipesSlice.actions;
