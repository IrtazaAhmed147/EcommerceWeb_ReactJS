import { createSlice } from "@reduxjs/toolkit";

export const getApi = createSlice({
    name: 'getApi',
    initialState: {
        products: [],
        categoryList: []
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products;

        },
        setCategoryList: (state, action) => {
            state.categoryList = action.payload;
        }
    }
})


export const { setProducts, setCategoryList } = getApi.actions
export default getApi.reducer




export const getAllProducts = () => async (dispatch) => {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=20&select=title,price,rating,images,discountPercentage')
        const data = await response.json()
        dispatch(setProducts(data))
        return data
    } catch (error) {
        console.log(error);

    }

}

export const getCategoriesList = () => async (dispatch) => {

    try {
        const response = await fetch('https://dummyjson.com/products/categories')
        const data = await response.json()
        dispatch(setCategoryList(data))
        return data
    } catch (error) {
        console.log(error);

    }
}

export const getProductByCategories = (category = "beauty") => async (dispatch) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}?select=title,price,images,discountPercentage`)
        const data = await response.json()
        dispatch(setProducts(data))
        return data
    } catch (error) {
        console.log(error);

    }

}


