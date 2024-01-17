import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userState: {}
};

export const userStateSlice = createSlice({
    name: "userState",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userState = action.payload;
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.userState = action.payload;
        }
    },

});

export const {
    login, logout
} = userStateSlice.actions;

export default userStateSlice.reducer;