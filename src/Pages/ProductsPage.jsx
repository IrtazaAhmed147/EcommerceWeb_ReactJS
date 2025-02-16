import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import {  getProductByCategories } from '../Utils/Api';
import Card from '../Components/Card';
import { Link, useNavigate, useParams } from 'react-router';
import { CircularProgress } from '@mui/material';
import { emptySearch, getAllProducts, getCategoriesList, getProductByCategories, getProductBySearch } from '../Features/ApiSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductsPage = () => {


    const { categorySlug } = useParams()
    const listLoader = useSelector(state => state.loader.categoryListApi);
    const wishlistProduct = useSelector(state => state.wishlist.wishlistProducts)

    const data = useSelector(state => state.api.products);
    const { products, total } = data

    const isInWishlist = (id) => wishlistProduct.some((item) => item.id === id);
    const categoriesList = useSelector(state => state.api.categoryList);
    const searchValue = useSelector(state => state.api.search);
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.AllProductsApi);
    const [skipNo , setSkipNo] = useState(0)



    useEffect(() => {

        if (searchValue) {

            dispatch(getProductBySearch(searchValue));
        } else {

            if (categorySlug !== "all") {
                dispatch(getProductByCategories(categorySlug));
            } else {
                dispatch(getAllProducts());
            }
        }
    }, [dispatch, categorySlug, searchValue]);

    useEffect(() => {
        if (categoriesList.length > 0) {
            return
        }
        dispatch(getCategoriesList())
    }, [dispatch])
    const navigate = useNavigate()
    const handleOption = (e)=> {
        console.log(e.target.value);
        dispatch(emptySearch())
        navigate(`/products/category/${e.target.value}`)
    }
    
    const handlePagination = ()=> {
        setSkipNo(prev => prev + 20)
        // console.log( prev + 20);
        dispatch(getAllProducts(skipNo));
        console.log(skipNo);
    }
    
    return (
        <>
            <div className='block w-full md:flex'>

                {window.innerWidth <= 767 && <div className='w-full my-3 px-2 block md:hidden'>
                    <select value={categorySlug === "all" ? "Select Category" : categorySlug}  className='w-full p-2 cursor-pointer rounded-md outline-none bg-neutral-300' onChange={(e)=> handleOption(e)}>
                        <option className='bg-neutral-200' value="Select Category" disabled={true}>Select Category</option>
                        <option className='bg-neutral-200' value="all">All</option>
                        {categoriesList?.map((category) => {
                            return <option key={category.name}  className='bg-neutral-200' value={category.slug}>
                                    {category.name}
                                

                            </option>
                        })}

                    </select>
                </div>}


                <div className='w-[25%] lg:w-[20%] border-r pt-7 pe-4  justify-end hidden md:flex'>
                    <ul className='flex flex-col gap-[10px]'>

                        {listLoader && <>
                            <div className='w-[150px] h-[400px] flex items-center justify-center'>
                                <CircularProgress color="inherit" />
                            </div>
                        </>}




                        {window.innerWidth > 767 &&  navigator.onLine && !listLoader && <>
                            <li className='duration-[0.5s] transition-all ease-in-out flex justify-between w-[160px] px-2 rounded-md hover:bg-neutral-200 cursor-pointer' onClick={() => dispatch(emptySearch())} >
                                <Link to={"/products/category/all"} style={{width: "100%"}} >
                                    <p>All</p>
                                    <p className='hidden'>
                                        <NavigateNextIcon />
                                    </p>
                                </Link>
                            </li>
                            {categoriesList?.map((category) => {
                                return <li key={category.name}  onClick={() => dispatch(emptySearch())} className='duration-[0.5s] transition-all ease-in-out flex justify-between w-[160px] px-2 rounded-md hover:bg-neutral-200 cursor-pointer'>
                                    <Link to={`/products/category/${category.slug}`} style={{width: "100%"}}>
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
                
                <div className='w-[100%] md:w-[75%] px-3 my-5 m-auto min-h-screen' >
                    {loader && <div className='w-[100%] h-screen flex items-center justify-center'>
                        <CircularProgress color="inherit" />
                    </div>}
                    {!loader && <> <h1 className='text-4xl font-semibold my-3'>{searchValue || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}</h1>
                        {!navigator.onLine && <h1 className='text-red-800 text-2xl my-5'>No Internet Connection</h1>}

                        <div className='flex flex-wrap md:gap-3 p-2'>
                            {total === 0 && "Product Not Found"}
                            {products?.map((item) => {
                                return <Card key={item.id} {...item} wishlist={isInWishlist(item.id)} />

                            })}
                        </div> </>}

                        <button className='cursor-pointer' onClick={handlePagination}>Next Page</button>
                </div>

            </div>
        </>
    )
}

export default ProductsPage
