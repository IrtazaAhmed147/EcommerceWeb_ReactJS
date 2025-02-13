import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import {  getProductByCategories } from '../Utils/Api';
import Card from '../Components/Card';
import { Link, useParams } from 'react-router';
import { CircularProgress } from '@mui/material';
import { getAllProducts, getCategoriesList, getProductByCategories } from '../Features/ApiSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductsPage = () => {

    // const [categoriesList, setCategoriesList] = useState([])
    // const [products, setProducts] = useState([])

    const { categorySlug } = useParams()
    const [listLoader, setListLoader] = useState(false)
    const [loader, setLoader] = useState(false)

    const products = useSelector(state => state.api.products);
    const categoriesList = useSelector(state => state.api.categoryList);
    const dispatch = useDispatch();


    console.log("outside");

    useEffect(() => {
        if (categorySlug !== "all") {
            dispatch(getProductByCategories(categorySlug));
        } else {
            dispatch(getAllProducts());
        }
    }, [dispatch, categorySlug]);
    
    useEffect(()=> {
        dispatch(getCategoriesList())
    },[dispatch])
    
    

    
    return (
        <>
            <div className='flex w-full'>
                <div className='w-[25%] lg:w-[20%] border-r pt-7 pe-4  justify-end hidden md:flex'>
                    <ul className='flex flex-col gap-[10px]'>

                        {listLoader && <>
                            <div className='w-[150px] h-[400px] flex items-center justify-center'>
                                <CircularProgress color="inherit" />
                            </div>
                        </>}

                        {!listLoader && <>
                            <li className='duration-[0.5s] transition-all ease-in-out flex justify-between w-[160px] px-2 rounded-md hover:bg-neutral-200 cursor-pointer'>
                                <p>All</p>
                                <p className='hidden'>
                                    <NavigateNextIcon />
                                </p>
                            </li>
                            {categoriesList?.map((category) => {
                                return <li key={category.name} onClick={() => dispatch(getProductByCategories(category.slug))} className='duration-[0.5s] transition-all ease-in-out flex justify-between w-[160px] px-2 rounded-md hover:bg-neutral-200 cursor-pointer'>
                                        <Link to={`/products/category/${category.slug}`}>
                                        <p>{category.name}</p>
                                        <p className='hidden'>
                                            <NavigateNextIcon />
                                        </p>
                                        </Link>
                                    
                                </li>
                            })} </>
                        }


                    </ul>
                </div>
                <div className='w-[100%] md:w-[75%] px-3 my-5 m-auto' >
                    {loader && <div className='w-[100%] h-screen flex items-center justify-center'>
                        <CircularProgress color="inherit" />
                    </div>}
                    {!loader && <> <h1 className='text-4xl font-semibold my-3'>{categorySlug}</h1>

                        <div className='flex flex-wrap gap-3 p-2'>
                            {products?.map((item) => {
                                return <Card key={item.id} {...item} />

                            })}
                        </div> </>}
                </div>

            </div>
        </>
    )
}

export default ProductsPage
