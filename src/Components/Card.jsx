import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router';
import "../CSS/responsive.css"
import { addToWishlist, deleteWishlistProduct, isExistInWishlist } from '../Features/WishlistSlice';
import { notify } from '../Utils/HelperFunctions';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
const Card = (props) => {

    const { id, title, thumbnail, rating, price, discountPercentage } = props
    const wishlistProducts = useSelector(state => state.wishlist.wishlistProducts);
    const isExist = wishlistProducts.some(product => product.id === id);

    let discountedPrice = price - (price * (discountPercentage / 100))
    const dispatch = useDispatch()

    const AddToWishlistFunc = async () => {
        if (isExist) {
            dispatch(deleteWishlistProduct(id));
            notify("info", "Product Removed From Wishlist");
        } else {
            const item = { id, title, price, rating, thumbnail, discountPercentage, discountedPrice, wishlist: true };
            dispatch(addToWishlist(item));
            notify("success", "Product Added To Wishlist");
        }

    }
  

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />


            <div className=' h-[350px] w-[270px] card-box'  >
                <div className=' h-[250px] w-full relative card-image-box'>
                    <div className='absolute top-[5px] left-[5px] bg-red-900 text-white rounded-sm flex p-1 cursor-pointer text-sm'>
                        {discountPercentage}%
                    </div>
                   
                    <div onClick={AddToWishlistFunc} className='absolute top-[5px] right-[5px] bg-white rounded-[50%] flex p-1 cursor-pointer'>
                        {isExist ? <FavoriteIcon style={{ width: "18px", height: "18px" }} /> : <FavoriteBorderIcon style={{ width: "18px", height: "18px" }} />}
                    </div>
                    <div className='absolute top-[35px] right-[5px] bg-white rounded-[50%] flex p-1 cursor-pointer'>
                        <Link to={`/product/${id}`}>
                            <VisibilityIcon style={{ width: "18px", height: "18px" }} />
                        </Link>
                    </div>
                    <img className='w-full h-full' src={thumbnail} alt="" />
                </div>
                <div className='flex flex-col '>
                    <h4>{title}</h4>
                    <p className='text-red-900'>${discountedPrice.toFixed(2)} <span className='line-through text-neutral-400'>${price}</span></p>
                    <p>{rating} <StarIcon style={{ color: "yellow" }} /></p>
                </div>
            </div>



        </>
    )
}

export default Card
