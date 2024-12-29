import { createSlice } from "@reduxjs/toolkit";

export type User = {
  email: string;
  id: string;
};

type AuthState = {
  currentUser: User | undefined;
  isLoading: boolean;
};

const initialState: AuthState = {
  currentUser: undefined,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hi: (state) => {
      console.log("hi");
    },
  },
});

export default authSlice.reducer;
