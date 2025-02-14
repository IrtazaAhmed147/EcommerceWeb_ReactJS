import { configureStore } from "@reduxjs/toolkit";
import apiReducer from './Features/ApiSlice'
import loaderSlice from './Features/LoaderSlice'
import cartSlice from "./Features/CartSlice";
import wishlistSlice from "./Features/WishlistSlice";

export const store = configureStore({
    reducer: {
        api: apiReducer,
        loader: loaderSlice,
        cart: cartSlice,
        wishlist: wishlistSlice,
        }
})