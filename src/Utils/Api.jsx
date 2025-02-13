

export const getHomeProducts = async () => {
    try {
        const response = await fetch("https://dummyjson.com/products?limit=8&skip=80&select=title,price,rating,images,discountPercentage")
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);

    }
}
export const todaysProductApi = async () => {
    let randomNum = Math.floor(Math.random() * 87)

    try {
        const response = await fetch(`https://dummyjson.com/products?limit=4&skip=${randomNum}&select=title,price,rating,images,discountPercentage`)
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error);

    }
}
export const getCategoriesList = async () => {

    try {
        const response = await fetch('https://dummyjson.com/products/categories')
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error);

    }
}

export const getProductByCategories = async (category = "beauty") => {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}?select=title,price,images,discountPercentage`)
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error);

    }

}

export const getAllProducts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=20&select=title,price,rating,images,discountPercentage')
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error);

    }

}

export const getSingleProduct = async (id = 3) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error);

    }
} 