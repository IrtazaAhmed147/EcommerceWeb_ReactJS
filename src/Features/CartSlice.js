import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("cart")) || [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items)); // Sync Local Storage
          },
          updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            state.items = state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            );
            localStorage.setItem("cart", JSON.stringify(state.items)); // Sync Local Storage
          },
    },
});

export const { addToCart,updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
