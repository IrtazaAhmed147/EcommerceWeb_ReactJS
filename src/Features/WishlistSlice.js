import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistProducts: JSON.parse(localStorage.getItem("wishlist")) || []
};

export const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            state.wishlistProducts.push(action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.wishlistProducts));
        },
        deleteWishlistProduct: (state, action)=> {
            const id = action.payload
            state.wishlistProducts = state.wishlistProducts.filter((item)=> {
          
                return item.id !== id
            })
            localStorage.setItem("wishlist", JSON.stringify(state.wishlistProducts));
        },
    },
});

export const { addToWishlist,deleteWishlistProduct } = wishlistSlice.actions;
export default wishlistSlice.reducer;
