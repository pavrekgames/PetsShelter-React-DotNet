import { createSlice } from "@reduxjs/toolkit";


export const messagesCountSlice = createSlice({
    name: "messagesCount",
    initialState: {value: 0},
    reducers:{
        setMessagesCount: (state, action) => {
            state.value = action.payload.messagesCount;
        },
        getMessagesCount: (state) => {
            return state;
        },
    }
});

export default messagesCountSlice.reducer;

export const {setMessagesCount, getMessagesCount} = messagesCountSlice.actions;