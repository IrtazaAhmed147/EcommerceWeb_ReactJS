import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router';
// import { getHomeProducts } from '../Utils/Api';
const Card = (props) => {

    const { id, title, images, rating, price, discountPercentage } = props

    let discountedPrice = price - (price * (discountPercentage / 100))


    return (
        <>


            <div className='h-[350px] w-[270px]'  >
                <div className='h-[250px] w-full relative'>
                    <div className='absolute top-[5px] left-[5px] bg-red-900 text-white rounded-sm flex p-1 cursor-pointer text-sm'>
                        {discountPercentage}%
                    </div>
                    <div className='absolute top-[5px] right-[5px] bg-white rounded-[50%] flex p-1 cursor-pointer'>
                        <FavoriteBorderIcon style={{ width: "18px", height: "18px" }} />
                    </div>
                    <div className='absolute top-[35px] right-[5px] bg-white rounded-[50%] flex p-1 cursor-pointer'>
                        <Link to={`/product/${id}`}>
                            <VisibilityIcon style={{ width: "18px", height: "18px" }} />
                        </Link>
                    </div>
                    <img className='w-full h-full' src={images[0]} alt="" />
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
