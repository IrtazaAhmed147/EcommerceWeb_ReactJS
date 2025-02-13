import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getAllProducts, getCategoriesList, getProductByCategories } from '../Utils/Api';
import Card from '../Components/Card';
import { Link, useParams } from 'react-router';

const ProductsPage = () => {

    const [categoriesList, setCategoriesList] = useState([])
    const [products, setProducts] = useState([])

    const { categorySlug } = useParams()
    console.log(categorySlug);


    useEffect(() => {

        const categoriesList = async () => {
            try {

                const data = await getCategoriesList()
                setCategoriesList(data)
            } catch (error) {
                console.log(error);

            }
        }
        const getProducts = async () => {
            try {

                const data = await getAllProducts()
                console.log(data);

                setProducts(data.products)
            } catch (error) {
                console.log(error);

            }
        }
        const getProductsCategories = async () => {
            try {
                console.log("hit");
                

                const data = await getProductByCategories(categorySlug)
                console.log(data);

                setProducts(data.products)
                console.log(products);
                
            } catch (error) {
                console.log(error);

            }
        }
        if (categorySlug === "all") {

            getProducts()
        } else {
            getProductsCategories()
        }
        categoriesList()
    }, [])

    return (
        <>
            <div className='flex w-full'>
                <div className='w-[25%] lg:w-[20%] border-r pt-7 pe-4  justify-end hidden md:flex'>
                    <ul className='flex flex-col gap-[10px]'>
                        <li className='duration-[0.5s] transition-all ease-in-out flex justify-between w-[160px] px-2 rounded-md hover:bg-neutral-200 cursor-pointer'>
                            <p>All</p>
                            <p className='hidden'>
                                <NavigateNextIcon />
                            </p>
                        </li>
                        {categoriesList?.map((category) => {
                            return <li key={category.name} className='duration-[0.5s] transition-all ease-in-out flex justify-between w-[160px] px-2 rounded-md hover:bg-neutral-200 cursor-pointer'>
                                <Link to={`/products/category/${category.slug}`}>
                                    <p>{category.name}</p>
                                    <p className='hidden'>
                                        <NavigateNextIcon />
                                    </p>
                                </Link>
                            </li>
                        })}



                    </ul>
                </div>
                <div className='w-[100%] md:w-[75%] px-3 my-5 m-auto' >

                    <h1 className='text-4xl font-semibold my-3'>{categorySlug}</h1>

                    <div className='flex flex-wrap gap-3 p-2'>
                        {products?.map((item) => {
                            return <Card key={item.id} {...item} />

                        })}
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductsPage
