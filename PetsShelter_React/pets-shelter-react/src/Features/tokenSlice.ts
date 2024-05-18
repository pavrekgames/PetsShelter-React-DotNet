import { createSlice } from "@reduxjs/toolkit";


export const tokenSlice = createSlice({
    name: "token",
    initialState: {value: "empty"},
    reducers:{
        setToken: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('token', state.value);
        },
        getToken: (state) => {
            return state;
        },
        removeToken: (state) => {
            state.value = "empty";
            localStorage.removeItem('token');;
        },
    }
});


export default tokenSlice.reducer;

export const {setToken, getToken, removeToken} = tokenSlice.actions;