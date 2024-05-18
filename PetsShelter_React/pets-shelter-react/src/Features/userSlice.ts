import { createSlice } from "@reduxjs/toolkit";
import { User } from "../Models/User";

export const userSlice = createSlice({
    name: "user",
    initialState:  {id: 0, name: "", surname: "", email: "", role: "", tokens_count: 0} as User,
    reducers:{
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.tokens_count = action.payload.tokens_count;
        },
        removeUser: (state) => {
            state.id = 0;
            state.name = "";
            state.surname = "";
            state.email = "";
            state.role = "";
            state.tokens_count = 0;
        }
    }
});

export default userSlice.reducer;

export const {setUser, removeUser} = userSlice.actions;