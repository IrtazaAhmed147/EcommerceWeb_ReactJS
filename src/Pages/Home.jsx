import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SliderComponent from '../Components/SliderComponent';
import Card from '../Components/Card';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router';
import { getCategoriesList, getHomeProducts, todaysProductApi } from '../Features/ApiSlice';
import { useDispatch, useSelector } from 'react-redux';



const Home = () => {


    const dispatch = useDispatch();
    const products = useSelector(state => state.api.homeProducts);
    const todayProducts = useSelector(state => state.api.todayProducts);
    const categoriesList = useSelector(state => state.api.categoryList);
    const categoriesListLoader = useSelector(state => state.loader.categoryListApi);
    const loader = useSelector(state => state.loader.HomeProductsApi);
    const todayLoader = useSelector(state => state.loader.todayProductApi);

    useEffect(() => {
        dispatch(getHomeProducts())
    }, [dispatch])
    useEffect(() => {
        dispatch(todaysProductApi())
    }, [dispatch])
    useEffect(() => {
        if (categoriesList.length > 0) {
            return
        }
        dispatch(getCategoriesList())
    }, [dispatch])

    


    return (
        <>
            <div className='flex w-full'>
                <div className='w-[25%] lg:w-[20%] border-r pt-7 pe-4  justify-end hidden md:flex'>
                    <ul className='flex flex-col gap-[10px]'>
                        {categoriesListLoader && <>
                            <div className='w-[150px] h-[400px] flex items-center justify-center'>
                                <CircularProgress color="inherit" />
                            </div>
                        </>}

                        {!categoriesListLoader && categoriesList?.slice(0, 8).map((category) => {
                            return <li key={category.name} className='duration-[0.5s] transition-all ease-in-out flex justify-between w-[160px] px-2 rounded-md hover:bg-neutral-200 cursor-pointer'>
                                <p>{category.name}</p>
                                <p className='hidden'>
                                    <NavigateNextIcon />
                                </p>
                            </li>
                        })}



                    </ul>
                </div>
                <div className='w-[80%] md:w-[65%]  m-auto mt-[30px] '>
                    <SliderComponent where="poster" />
                </div>
            </div>

            <div className=' w-[90%] m-auto my-4'>
                <div className='flex gap-1 items-center mb-3    '>

                    <div className='bg-red-900 h-[20px] w-[13px] rounded-sm'></div>
                    <h3 className='text-red-900 '>Groceries</h3>
                </div>
                <div className='flex justify-center w-full gap-3 flex-wrap min-h-[300px] items-center'>
                {!navigator.onLine && <h1 className='text-red-800 text-xl'>No Internet Connection</h1>}
                    {todayLoader && <CircularProgress color="inherit" />}

                    {!todayLoader && todayProducts?.map((item) => {
                        return <Card key={item.id} {...item} />

                    })}

                </div>
                <div className='flex justify-center w-full'>
                    <Link to={`/products/category/groceries`}>
                        <Button style={{ backgroundColor: "var(--button2)", margin: "auto" }} variant="contained">View All Products</Button>
                    </Link>
                </div>
            </div>
            <div className=' w-[90%] m-auto my-4'>
                <div className='flex gap-1 items-center mb-3'>

                    <div className='bg-red-900 h-[20px] w-[13px] rounded-sm'></div>
                    <h3 className='text-red-900 '>Categories</h3>
                </div>
                <h1 className='text-2xl font-bold'>Browse By Category</h1>
                <div className=' w-[90%] m-auto mt-6 mb-13'>

                    <SliderComponent where="categories" data={categoriesList} />

                </div>

            </div>

            <div className='w-[90%] h-[200px] sm:h-[300px] lg:h-[470px] md:h-[370px] m-auto mb-[10px]'>
                <img style={{ width: "100%", height: "100%" }} src="https://image.adsoftheworld.com/n2dcz8j81bv7x8ep3v4xkp8qfuxl" alt="" />
            </div>
            <div className=' w-[90%] m-auto my-4'>
                <div className='flex gap-1 items-center mb-3'>

                    <div className='bg-red-900 h-[20px] w-[13px] rounded-sm'></div>
                    <h3 className='text-red-900 '>Our Products</h3>
                </div>
                <h1 className='text-4xl font-bold'>Explore Our Products</h1>
                <div className='flex justify-center w-full gap-3 flex-wrap min-h-[300px] items-center'>
                {!navigator.onLine && <h1 className='text-red-800 text-xl'>No Internet Connection</h1>}
                    {loader && <CircularProgress color="inherit" />}
                    {!loader && products?.map((item) => {
                        return <Card key={item.id} {...item} />

                    })}

                </div>
                <div className='flex justify-center w-full'>
                    <Link to={`/products/category/all`}>
                        <Button style={{ backgroundColor: "var(--button2)", margin: "auto" }} variant="contained">View All Products</Button>
                    </Link>
                </div>

            </div>


            <div className='flex flex-wrap gap-5 items-center justify-center  py-10'>
                <div className='w-[260px] h-[160px] flex flex-col items-center justify-center'>
                    <div className='bg-neutral-400 w-[50px] h-[50px] rounded-[50%] p-2 mb-5'>
                        <div className='bg-black rounded-[50%] p-1'>
                            <DeliveryDiningIcon style={{ color: "white" }} />
                        </div>
                    </div>

                    <h1 className='font-semibold text-xl'>FREE AND FAST DELIVERY</h1>
                    <p className='text-sm'>Free delivery for all orders over $140</p>

                </div>
                <div className='w-[260px] h-[160px] flex flex-col items-center justify-center'>
                    <div className='bg-neutral-400 w-[50px] h-[50px] rounded-[50%] p-2 mb-5'>
                        <div className='bg-black rounded-[50%] p-1'>
                            <HeadsetMicIcon style={{ color: "white" }} />
                        </div>
                    </div>

                    <h1 className='font-semibold text-xl'>24/7 CUSTOMER SERVICE</h1>
                    <p className='text-sm'>Friendly 24/7 customer support</p>

                </div>
                <div className='w-[260px] h-[160px] flex flex-col items-center justify-center'>
                    <div className='bg-neutral-400 w-[50px] h-[50px] rounded-[50%] p-2 mb-5'>
                        <div className='bg-black rounded-[50%] p-1'>
                            <VerifiedUserOutlinedIcon style={{ color: "white" }} />
                        </div>
                    </div>

                    <h1 className='font-semibold text-xl'>MONEY BACK GUARANTEE</h1>
                    <p className='text-sm'>We reurn money within 30 days</p>

                </div>


            </div>



        </>
    )
}

export default Home
