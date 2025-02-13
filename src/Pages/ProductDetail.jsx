import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../Features/ApiSlice';

const ProductDetail = () => {

    const { productId } = useParams()

    const dispatch = useDispatch();


    const singleProduct = useSelector(state => state.api.singleProduct);
    const loader = useSelector(state => state.loader.singleProductApi);

    useEffect(() => {
        dispatch(getSingleProduct(productId))
    }, [dispatch])



    const { title, description, category, brand, rating, dimensions, reviews, returnPolicy, warrantyInformation, images, price, discountPercentage } = singleProduct

    let discountedPrice = price - (price * (discountPercentage / 100))

    if (loader) return <div className='w-full flex justify-center items-center h-screen'>
        <CircularProgress color="inherit" />
    </div>

    return (
        <>



            <div className='py-15 w-[85%] m-auto'>
                <p className='text-neutral-500'>
                    <Link to={`/products/category/${category}`}>
                        {category}
                    </Link>
                    / <span className='text-black'>{title}</span></p>
            </div>

            <div className='w-[85%] m-auto flex gap-5 flex-wrap mb-5'>
                <div className='block gap-4 md:flex'>
                    <div className='flex flex-row gap-2 md:flex-col mb-3'>

                        {images?.slice(1).map((image, i) => {
                            return <div key={i} className='w-[170px] h-[138px] bg-neutral-200 flex justify-center items-center'>
                                <img style={{ width: "121px", height: "114px" }} src={image} alt="" />
                            </div>
                        })}


                    </div>
                    <div className='w-[500px] h-[550px] bg-neutral-200 flex justify-center items-center bg-neutral-200 flex justify-center items-center'>

                        <img style={{ width: "446px", height: "315px" }} src={images ? images[0] : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"} alt="" />
                    </div>
                </div>
                <div className='w-[400px]'>
                    <h1 className='text-3xl font-semibold'>{title}</h1>
                    <p>{rating}
                        {Array.from({ length: Math.round(rating) }).map((_, i) => {
                            return <StarIcon key={i} style={{ color: "yellow" }} />

                        })}
                    </p>
                    <p className='text-xl font-semibold mb-4'>${discountedPrice.toFixed(2)} <span className='line-through text-neutral-300'>${price}</span></p>
                    <p>{description}</p>
                    <p className='mb-3'>Brand: <span className='font-semibold'>{brand}</span></p>
                    <h1 className='text-xl font-semibold'>Dimensions</h1>
                    <p className=''>Width: {dimensions?.width}</p>
                    <p className=''>Height: {dimensions?.height}</p>
                    <p className='mb-3'>Depth: {dimensions?.depth}</p>
                    <hr />

                    <div className='flex gap-2 mt-6'>
                        <div className='flex'>

                            <div style={{ borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px" }} className='border-1 flex items-center justify-center px-2 py-1 cursor-pointer'><RemoveIcon /></div>
                            <div className='border-1 flex items-center justify-center px-7 py-2'>1</div>
                            <button style={{ borderTopRightRadius: "4px", borderBottomRightRadius: "4px" }} className='border-1 flex items-center justify-center px-2 py-1 cursor-pointer'><AddIcon /></button>
                        </div>
                        <Button style={{ backgroundColor: "var(--button2)", margin: "auto", cursor: "pointer", padding: "8px 40px" }} variant="contained">Buy Now</Button>
                        <div className='border-2 flex items-center justify-center rounded-md p-1 px-3 cursor-pointer'>
                            <FavoriteBorderIcon />
                        </div>
                    </div>

                    <div className='border-2 rounded-sm mt-3'>
                        <div className='flex gap-2 p-2'>
                            <div className='flex items-center justify-center w-[50px] '>
                                <VerifiedUserOutlinedIcon />
                            </div>
                            <div>
                                <p>Warranty</p>
                                <p>{warrantyInformation}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='flex gap-2 p-2'>
                            <div className='flex items-center justify-center w-[50px] '>
                                <AutorenewOutlinedIcon />
                            </div>
                            <div>
                                <p>Return Policy</p>
                                <p>{returnPolicy}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-[90%] m-auto mt-10 py-10 '>
                <div className='flex gap-1 items-center mb-3 '>

                    <div className='bg-red-900 h-[20px] w-[13px] rounded-sm'></div>
                    <h3 className='text-red-900 '>Reviews</h3>
                </div>
                <h1 className='text-2xl font-bold'>Reviews By Users</h1>
                <div className='flex gap-3 justify-center md:justify-start flex-wrap'>

                    {reviews?.map((review, i) => {

                        const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        });

                        return <div key={i} className='p-2 w-[300px] rounded-sm' style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                            <h1 className='text-semibold text-xl'>{review.reviewerName}</h1>
                            <p className='text-neutral-400 text-sm'>{formattedDate}</p>
                            <p className=''>{review.rating}
                                {Array.from({ length: Math.round(review.rating) }).map((_, i) => {
                                    return <StarIcon key={i} style={{ color: "yellow" }} />

                                })}
                            </p>
                            <p>{review.comment}</p>

                        </div>
                    })}



                </div>

            </div>
        </>
    )
}

export default ProductDetail
