import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryListApi: false,
    HomeProductsApi: false,
    AllProductsApi: false,
};

export const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setApiLoading: (state, action) => {
            const { apiName, isLoading } = action.payload;
            state[apiName] = isLoading;
        },
    },
});

export const { setApiLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
