import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";
import { axiosInstance } from "../../config/config";

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
      const response = await axiosInstance.post("/validate", {
        ids: idsToValidate,
      });
      return response.data; // Assuming the response is a list of valid IDs
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to validate recipe IDs."
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
        // Update the state with only valid IDs
        state.ids = state.ids.filter((id) => (payload as any).includes(id));
        saveToLocalStorage("likedRecipesIds", state.ids); // Sync with localStorage
      })
      .addCase(validateLikedRecipes.rejected, (state, { payload }) => {
        saveToLocalStorage("likedRecipesIds", []);
        state.ids = [];
      });
  },
});

export default likedRecipesSlice.reducer;

export const { toggleLike } = likedRecipesSlice.actions;
