import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductDetail = () => {
    return (
        <>
            <div className='py-15 w-[85%] m-auto'>
                <p className='text-neutral-500'>Laptops / <span className='text-black'>Apple MacBook Pro 14 Inch Space Grey</span></p>
            </div>

            <div className='w-[85%] m-auto flex gap-5 flex-wrap mb-5'>
                <div className='block gap-4 md:flex'>
                    <div className='flex flex-row gap-2 md:flex-col mb-3'>
                        <div className='w-[170px] h-[138px] bg-neutral-200 flex justify-center items-center'>

                            <img style={{ width: "121px", height: "114px" }} src="https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/2.png" alt="" />
                        </div>
                        <div className='w-[170px] h-[138px] bg-neutral-200 flex justify-center items-center'>

                            <img style={{ width: "121px", height: "114px" }} src="https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/3.png" alt="" />
                        </div>

                    </div>
                    <div className='w-[500px] h-[550px] bg-neutral-200 flex justify-center items-center bg-neutral-200 flex justify-center items-center'>

                        <img style={{ width: "446px", height: "315px" }} src="https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png" alt="" />
                    </div>
                </div>
                <div className='w-[400px]'>
                    <h1 className='text-3xl font-semibold'>Apple MacBook Pro 14 Inch Space Grey</h1>
                    <p>3.31 <StarIcon style={{ color: "yellow" }} /></p>
                    <p className='text-xl font-semibold mb-4'>$1799.99 <span className='line-through text-neutral-300'>$1999.99</span></p>
                    <p>The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.</p>
                    <p className='mb-3'>Brand: <span className='font-semibold'>Apple</span></p>
                    <h1 className='text-xl font-semibold'>Dimensions</h1>
                    <p className=''>Width: 12.31inch</p>
                    <p className=''>Height: 21.55inch</p>
                    <p className='mb-3'>Depth: 27.95inch</p>
                    <hr />

                    <div className='flex gap-2 mt-6'>
                        <div className='flex'>

                            <div style={{borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px"}} className='border-1 flex items-center justify-center px-2 py-1 cursor-pointer'><RemoveIcon /></div>
                            <div className='border-1 flex items-center justify-center px-7 py-2'>1</div>
                            <div style={{borderTopRightRadius: "4px", borderBottomRightRadius: "4px"}} className='border-1 flex items-center justify-center px-2 py-1 cursor-pointer'><AddIcon /></div>
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
                                <p>1 month warranty</p>
                            </div>
                        </div>
                        <hr />
                        <div className='flex gap-2 p-2'>
                            <div className='flex items-center justify-center w-[50px] '>
                                <AutorenewOutlinedIcon />
                            </div>
                            <div>
                                <p>Return Policy</p>
                                <p>30 days return policy</p>
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

                    <div className='p-2 w-[300px] rounded-sm' style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                        <h1 className='text-semibold text-xl'>Grayson Coleman</h1>
                        <p className='text-neutral-400 text-sm'>23 May 2024</p>
                        <p className=''>1 <StarIcon style={{ color: "yellow" }} /></p>
                        <p>Poor quality!</p>

                    </div>
                    <div className='p-2 w-[300px] rounded-sm' style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                        <h1 className='text-semibold text-xl'>Grayson Coleman</h1>
                        <p className='text-neutral-400 text-sm'>23 May 2024</p>
                        <p className=''>3 <StarIcon style={{ color: "yellow" }} /></p>
                        <p>Poor quality!</p>

                    </div>
                    <div className='p-2 w-[300px] rounded-sm' style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
                        <h1 className='text-semibold text-xl'>Grayson Coleman</h1>
                        <p className='text-neutral-400 text-sm'>23 May 2024</p>
                        <p className=''>5 <StarIcon style={{ color: "yellow" }} /></p>
                        <p>Poor quality!</p>

                    </div>

                </div>

            </div>
        </>
    )
}

export default ProductDetail
