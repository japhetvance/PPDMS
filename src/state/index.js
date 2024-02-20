import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  mode: "dark",
  userId: "",
  username: "",
  email: "",
  role: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state, action) => {
      const { userId, username, email, role } = action.payload;
      state.userId = userId;
      state.username = username;
      state.email = email;
      state.role = role;
    },
  },
});

export const { setMode, setUser } = globalSlice.actions;

export default globalSlice.reducer;
