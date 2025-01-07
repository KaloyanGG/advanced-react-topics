import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config/config";
import { getFromLocalStorage } from "../../utils/localStorage";

export type User = {
  email: string;
  id: string;
};

type AuthState = {
  currentUser: User | undefined;
  isLoading: boolean;
};

const initialState: AuthState = {
  currentUser: getFromLocalStorage("user") as User | undefined,
  isLoading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<{
        id: string;
        email: string;
        token: string;
      }>("/auth/login", userData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.currentUser = {
        email: payload.email.split("@")[0],
        id: payload.id,
      };
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
