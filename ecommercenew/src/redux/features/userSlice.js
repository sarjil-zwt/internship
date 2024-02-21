import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userState: {},
  token: "",
};

export const userStateSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      // localStorage.setItem("isLogged");
      state.userState = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userState = action.payload;
    },
  },
});

export const { login, logout } = userStateSlice.actions;

export default userStateSlice.reducer;
