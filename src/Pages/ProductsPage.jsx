import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getAllProducts, getCategoriesList } from '../Utils/Api';
import Card from '../Components/Card';

const ProductsPage = () => {

    const [categoriesList, setCategoriesList] = useState([])
    const [products, setProducts] = useState([])

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
        categoriesList()
        getProducts()
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
                                <p>{category.name}</p>
                                <p className='hidden'>
                                    <NavigateNextIcon />
                                </p>
                            </li>
                        })}



                    </ul>
                </div>
                <div className='w-[100%] md:w-[75%] px-3 my-5 m-auto' >

                    <h1 className='text-4xl font-semibold my-3'>All</h1>

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
