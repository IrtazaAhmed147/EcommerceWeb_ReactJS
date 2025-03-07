import { createSlice } from "@reduxjs/toolkit";
import { setApiLoading } from "./LoaderSlice";

export const getApi = createSlice({
    name: 'getApi',
    initialState: {
        products: [],
        categoryList: [],
        homeProducts: [],
        groceryProducts: [],
        singleProduct: {},
        totalProducts: 0,
        search: JSON.parse(localStorage.getItem("searchVal")) || "",
    },
    reducers: {
       
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addMoreProducts: (state, action) => {
            state.products = action.payload 
        },
        setCategoryList: (state, action) => {
            state.categoryList = action.payload;
        },
        setHomeProducts: (state, action) => {
            state.homeProducts = action.payload.products;
        },
        setGroceryProducts: (state, action) => {
            state.groceryProducts = action.payload.products;
        },
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload
            localStorage.setItem("searchVal", JSON.stringify(state.search))

        }, 
        emptySearch:(state)=> {
            state.search = ""
            localStorage.setItem("searchVal", JSON.stringify(state.search))
        }
    }
})


export const { setProducts, setCategoryList, setHomeProducts, setGroceryProducts, setSingleProduct, setSearch,emptySearch, addMoreProducts } = getApi.actions
export default getApi.reducer




export const getAllProducts = (skip = 0) => async (dispatch) => {
    
    dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: true }));
    try {
        const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${skip}&select=title,price,rating,thumbnail,discountPercentage`);
        const data = await response.json();
        
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        
        if (skip === 0) {
            
            dispatch(setProducts(data));
        } else {
            dispatch(addMoreProducts(data));
        }
    } catch (error) {
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        throw new Error(error.message)
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
        throw new Error(error.message)

    }
}

export const getProductByCategories = (category = "beauty") => async (dispatch) => {

    dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: true }));
    dispatch(emptySearch())
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}?select=title,price,thumbnail,discountPercentage,rating`)
        const data = await response.json()
        
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        dispatch(setProducts(data))
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        throw new Error(error.message)

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
        throw new Error(error.message)

    }

}



export const getHomeProducts = () => async (dispatch) => {
    dispatch(setApiLoading({ apiName: "HomeProductsApi", isLoading: true }));
    try {
        const response = await fetch("https://dummyjson.com/products?limit=8&skip=90&select=title,price,rating,thumbnail,discountPercentage")
        const data = await response.json()
        dispatch(setApiLoading({ apiName: "HomeProductsApi", isLoading: false }));
        dispatch(setHomeProducts(data))
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "HomeProductsApi", isLoading: false }));
        throw new Error(error.message)

    }
}



export const groceryProductApi = () => async (dispatch) => {
    let randomNum = Math.floor(Math.random() * 18)
    dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: true }));
    try {
        const response = await fetch(`https://dummyjson.com/products/category/groceries?limit=4&skip=${randomNum}&select=title,price,rating,thumbnail,discountPercentage`)
        const data = await response.json()

        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));

        dispatch(setGroceryProducts(data))
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        throw new Error(error.message)

    }
}


export const getSingleProduct = (id = 3) => async (dispatch) => {
    dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: true }));
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()
        dispatch(setSingleProduct(data))
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        throw new Error(error.message)

    }
} 