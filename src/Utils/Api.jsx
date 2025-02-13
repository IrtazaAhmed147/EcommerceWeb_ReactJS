

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





export const getSingleProduct = async (id = 3) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()

        return data
    } catch (error) {
        console.log(error);

    }
} 