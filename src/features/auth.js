import { createSlice } from "@reduxjs/toolkit";

const { actions, reducer } = createSlice({
  name: "auth",
  initialState: false,
  reducers: {
    login: (state) => {
      return (state = true);
    },
    logout: (state) => {
      return (state = false);
    },
    set: (state, action) => {
      return action.payload;
    },
  },
});

export const { login, logout } = actions;

export default reducer;
