import { createSlice } from "@reduxjs/toolkit";
import { setApiLoading } from "./LoaderSlice";

export const getApi = createSlice({
    name: 'getApi',
    initialState: {
        products: [],
        categoryList: [],
        homeProducts: [],
        todayProducts: [],
        singleProduct: {},
        search: "",
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setCategoryList: (state, action) => {
            state.categoryList = action.payload;
        },
        setHomeProducts: (state, action) => {
            state.homeProducts = action.payload.products;
        },
        setTodayProducts: (state, action) => {
            state.todayProducts = action.payload.products;
        },
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload;
        },
        setSearch: (state, action)=> {
            state.search = action.payload
        }
    }
})


export const { setProducts, setCategoryList, setHomeProducts, setTodayProducts, setSingleProduct,setSearch } = getApi.actions
export default getApi.reducer




export const getAllProducts = () => async (dispatch) => {

    dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: true }));

    try {
        const response = await fetch('https://dummyjson.com/products?limit=20&select=title,price,rating,images,discountPercentage')
        const data = await response.json()
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        dispatch(setProducts(data))
        return data
    } catch (error) {
        console.log(error);
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));

    }

}

export const getCategoriesList = () => async (dispatch) => {
    dispatch(setApiLoading({ apiName: "categoryListApi", isLoading: true }));
    try {
        const response = await fetch('https://dummyjson.com/products/categories')
        const data = await response.json()
        dispatch(setApiLoading({ apiName: "categoryListApi", isLoading: false }));
        dispatch(setCategoryList(data))
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "categoryListApi", isLoading: false }));
        console.log(error);

    }
}

export const getProductByCategories = (category = "beauty") => async (dispatch) => {
    dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: true }));
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}?select=title,price,images,discountPercentage`)
        const data = await response.json()
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        dispatch(setProducts(data))
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        console.log(error);

    }

}
export const getProductBySearch = (input = "ball") => async (dispatch) => {
    dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: true }));
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${input}`)
        const data = await response.json()
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        dispatch(setProducts(data))
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        console.log(error);

    }

}



export const getHomeProducts = () => async (dispatch) => {
    dispatch(setApiLoading({ apiName: "HomeProductsApi", isLoading: true }));
    try {
        const response = await fetch("https://dummyjson.com/products?limit=8&skip=90&select=title,price,rating,images,discountPercentage")
        const data = await response.json()
        dispatch(setApiLoading({ apiName: "HomeProductsApi", isLoading: false }));
        dispatch(setHomeProducts(data))
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "HomeProductsApi", isLoading: false }));
        console.log(error);

    }
}



export const todaysProductApi = () => async (dispatch) => {
    let randomNum = Math.floor(Math.random() * 21)
    dispatch(setApiLoading({ apiName: "todayProductApi", isLoading: true }));
    try {
        const response = await fetch(`https://dummyjson.com/products/category/groceries?limit=4&skip=${randomNum}&select=title,price,rating,images,discountPercentage`)
        const data = await response.json()

        dispatch(setApiLoading({ apiName: "todayProductApi", isLoading: false }));

        dispatch(setTodayProducts(data))
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "todayProductApi", isLoading: false }));
        console.log(error);

    }
}


export const getSingleProduct = (id = 3) => async (dispatch) => {
    dispatch(setApiLoading({ apiName: "singleProductApi", isLoading: true }));
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()
        dispatch(setSingleProduct(data))
        dispatch(setApiLoading({ apiName: "singleProductApi", isLoading: false }));
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "singleProductApi", isLoading: false }));
        console.log(error);

    }
} 