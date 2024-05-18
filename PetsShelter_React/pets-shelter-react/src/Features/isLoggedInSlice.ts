import { createSlice } from "@reduxjs/toolkit";

export const isLoggedInSlice = createSlice({
    name: "isLoggedIn",
    initialState: {value: false},
    reducers:{
        logIn: (state) => {
            state.value = true;
        },
        logOut: (state) => {
            state.value = false;
        },
    }
});

export default isLoggedInSlice.reducer;

export const {logIn, logOut} = isLoggedInSlice.actions;