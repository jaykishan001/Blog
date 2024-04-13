import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

//created a store
const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store;