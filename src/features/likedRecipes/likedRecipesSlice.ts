import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";
import { axiosInstance } from "../../config/config";
import { logout } from "../auth/authSlice";

type LikedRecipesState = {
  ids: string[];
};

const initialState: LikedRecipesState = {
  ids: getFromLocalStorage("likedRecipesIds") || [],
};

export const validateLikedRecipes = createAsyncThunk(
  "likedRecipes/validateLikedRecipes",
  async (idsToValidate: string[], { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<string[]>("/validate", {
        ids: idsToValidate,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to validate recipe IDs."
      );
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(validateLikedRecipes.fulfilled, (state, { payload }) => {
        state.ids = state.ids.filter((id) => payload.includes(id));
        saveToLocalStorage("likedRecipesIds", state.ids); // Sync with localStorage
      })
      .addCase(validateLikedRecipes.rejected, (state, { payload }) => {
        saveToLocalStorage("likedRecipesIds", []);
        state.ids = [];
      })
      .addCase(logout, (state) => {
        state.ids = []; // Clear the liked recipes
        saveToLocalStorage("likedRecipesIds", []); // Clear localStorage
      });
  },
});

export default likedRecipesSlice.reducer;

export const { toggleLike } = likedRecipesSlice.actions;
