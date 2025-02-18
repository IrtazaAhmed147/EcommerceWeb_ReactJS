import React, { useEffect, useState } from 'react'
import { Button, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../Features/ApiSlice';
import { addToCart, updateQuantity } from '../Features/CartSlice';
import { notify } from '../Utils/HelperFunctions';
import { addToWishlist, deleteWishlistProduct } from '../Features/WishlistSlice';
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductDetail = () => {

    const { productId } = useParams()
    const dispatch = useDispatch();


    const singleProduct = useSelector(state => state.api.singleProduct);
    const loader = useSelector(state => state.loader.AllProductsApi);
    const cartItems = useSelector(state => state.cart.items)
    const wishlistProducts = useSelector(state => state.wishlist.wishlistProducts)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        dispatch(getSingleProduct(productId))
    }, [dispatch])

    const isInWishlist = wishlistProducts.some(product => product.id === parseInt(productId));

    const { title, description, category, brand, rating, dimensions, reviews, returnPolicy, warrantyInformation, images, price, discountPercentage, thumbnail, id } = singleProduct


    let discountedPrice = (price - (price * (discountPercentage / 100))).toFixed(2)





    const addToCartFunc = () => {


        const existingProduct = cartItems.find(item => item.id === id);
        if (existingProduct) {
            dispatch(updateQuantity({ id, quantity }));
            notify("success", "Product Quantity Updated");
            return;
        }

        const item = {
            id,
            title,
            price,
            category,
            thumbnail,
            discountPercentage,
            quantity: quantity,
            discountedPrice,
            totalPrice: (quantity * discountedPrice).toFixed(2),
        };
        dispatch(addToCart(item));
        notify("success", "Product Added");

    }

    const toggleWishlist = () => {
        if (isInWishlist) {
            dispatch(deleteWishlistProduct(id));
            notify("error", "Product Removed From Wishlist");
        } else {
            const item = {
                id,
                title,
                price,
                rating,
                thumbnail,
                discountPercentage,
                discountedPrice,
                wishlist: true
            };
            dispatch(addToWishlist(item));
            notify("success", "Product Added To Wishlist");
        }
    };







    if (loader) return <div className='w-full flex justify-center items-center h-screen'>
        <CircularProgress color="inherit" />
    </div>

    return (
        <>




            <div className='py-15 w-[95%] m-auto'>
                <p className='text-neutral-500'>
                    <Link to={`/products/category/${category}`}>
                        {category}
                    </Link>
                    / <span className='text-black'>{title}</span></p>
            </div>

            <div className='w-[95%] m-auto flex gap-2 flex-wrap mb-5'>
                <div className='block gap-4 md:flex  lg:w-[52%] w-[100%]'>
                    <div className='flex flex-row gap-1 sm:gap-2 md:flex-col mb-3 md:mb-0'>

                        {images?.slice(1).map((image, i) => {
                            return <div key={i} className='w-[25%] md:w-[150px]  h-[auto] md:h-[138px] bg-neutral-200 flex justify-center items-center'>
                                <img className='w-[90%] ' src={image} alt="" />
                            </div>
                        })}


                    </div>
                    <div className='w-[100%] h-[auto] py-7    bg-neutral-200 flex justify-center items-center bg-neutral-200 flex justify-center items-center'>

                        <img className='max-h-[450px]' src={images && images[0]} alt="" />
                    </div>
                </div>
                <div className='w-[100%] lg:w-[47%]'>
                    <h1 className='text-4xl sm:text-6xl font-semibold'>{title}</h1>
                    <p>{rating}
                        {Array.from({ length: Math.round(rating) }).map((_, i) => {
                            return <StarIcon key={i} style={{ color: "yellow" }} />

                        })}
                    </p>
                    <p className='text-xl font-semibold mb-4'>${discountedPrice}</p>
                    <p className='text-sm sm:text-base'>{description}</p>
                   {brand && <p className='mb-3'>Brand: <span className='font-semibold'>{brand}</span></p>}
                    <h1 className='text-xl font-semibold mt-3'>Dimensions</h1>
                    <p className=''>Width: {dimensions?.width}</p>
                    <p className=''>Height: {dimensions?.height}</p>
                    <p className='mb-3'>Depth: {dimensions?.depth}</p>
                    <hr />

                    <div className='flex gap-2 mt-6 flex-wrap  w-[100%] sm:w-[500px] lg:w-[100%]'>
                        <div className='flex'>

                            <button onClick={() => {
                                if (quantity === 1) {
                                    return
                                }
                                setQuantity(prev => prev - 1)
                            }} style={{ borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px" }} className='border-1 flex items-center justify-center px-2 py-1 cursor-pointer hover:bg-neutral-200'><RemoveIcon /></button>
                            <div className='border-1 flex items-center justify-center px-7 py-2'>{quantity}</div>
                            <button onClick={() => {
                                if (quantity === 10) {
                                    return
                                }
                                setQuantity(prev => prev + 1)
                            }} style={{ borderTopRightRadius: "4px", borderBottomRightRadius: "4px" }} className='border-1 flex items-center justify-center px-2 py-1 cursor-pointer hover:bg-neutral-200'><AddIcon /></button>
                        </div>
                        <Button style={{ backgroundColor: "var(--button2)", cursor: "pointer", padding: "8px 40px" }} variant="contained" onClick={addToCartFunc}>Add To Cart</Button>
                        <div className='border-2 flex items-center justify-center rounded-md p-1 px-3 cursor-pointer' onClick={toggleWishlist} >
                            {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </div>
                    </div>

                    <div className='border-2 rounded-sm mt-3 w-[100%] sm:w-[500px] lg:w-[100%]'>
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

            <div className='w-[95%] m-auto mt-10 py-10 '>
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
