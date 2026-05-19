import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducers/AdminReducers";

const store=configureStore({
    reducer:{
        admin:adminReducer,
    },
});

export default store;