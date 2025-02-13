import { configureStore } from "@reduxjs/toolkit";
import apiReducer from './Features/ApiSlice'
import loaderSlice from './Features/LoaderSlice'

export const store = configureStore({
    reducer: {
        api: apiReducer,
        loader: loaderSlice,
    }
})