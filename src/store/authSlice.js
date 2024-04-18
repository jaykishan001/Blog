import { createSlice } from "@reduxjs/toolkit";


const initialState =  {
    status: false,
    userData: null,
}
//created a slice or method 

const authSlice = createSlice({
    name: "auth",
    initialState,

// these are actions

    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
    },
});
export const { login: authLogin, logout } = authSlice.actions;
export default authSlice.reducer;