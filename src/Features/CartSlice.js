import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("cart")) || [],
    subTotal: 0,
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
                item.id === id ? { ...item, quantity, totalPrice: (quantity * (item.discountedPrice)).toFixed(2) } : item
            );
            localStorage.setItem("cart", JSON.stringify(state.items)); // Sync Local Storage
        },
        deleteCartItem: (state, action)=> {
            const id = action.payload
            state.items = state.items.filter((item)=> {
                return item.id !== id
            })
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        subTotalPrice: (state) => {
            
            state.subTotal = state.items.reduce((a, b) => {
                return a + parseInt(b.totalPrice)
            }, 0)
        }

    },
});

export const { addToCart, updateQuantity, subTotalPrice, deleteCartItem } = cartSlice.actions;
export default cartSlice.reducer;
