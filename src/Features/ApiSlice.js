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
        setTodayProducts: (state, action) => {
            state.todayProducts = action.payload.products;
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


export const { setProducts, setCategoryList, setHomeProducts, setTodayProducts, setSingleProduct, setSearch,emptySearch, addMoreProducts } = getApi.actions
export default getApi.reducer




export const getAllProducts = (skip = 0) => async (dispatch) => {
    console.log(skip);
    
    dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: true }));
    try {
        const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${skip}&select=title,price,rating,thumbnail,discountPercentage`);
        const data = await response.json();
        
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        
        if (skip === 0) {
            dispatch(setProducts(data)); // First load, replace products
        } else {
            dispatch(addMoreProducts(data));
        }
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
    dispatch(emptySearch())
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}?select=title,price,thumbnail,discountPercentage,rating`)
        const data = await response.json()
        console.log(data);
        
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
        const response = await fetch("https://dummyjson.com/products?limit=8&skip=90&select=title,price,rating,thumbnail,discountPercentage")
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
    dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: true }));
    try {
        const response = await fetch(`https://dummyjson.com/products/category/groceries?limit=4&skip=${randomNum}&select=title,price,rating,thumbnail,discountPercentage`)
        const data = await response.json()

        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));

        dispatch(setTodayProducts(data))
        return data
    } catch (error) {
        dispatch(setApiLoading({ apiName: "AllProductsApi", isLoading: false }));
        console.log(error);

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
        console.log(error);

    }
} 