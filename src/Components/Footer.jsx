import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='min-h-[320px] flex md:justify-center flex-wrap items-center bg-black w-full gap-3'>
                <div className=' h-[200px]  text-white p-3 '>
                        <h1 className='text-2xl font-semibold' >Exclusive</h1>
                        <h1 className='text-xl font-semibold'>Subscribe</h1>
                        <p>Get 10% off your first order</p>
                        <input type="text" placeholder='Enter your email' />
                </div>
                <div className=' h-[200px]  text-white p-3'>
                        <h1 className='text-2xl font-semibold' >Support</h1>
                        <p>111 Bijoy sarani, Islamabad,  DH 1515, Pakistan.</p>
                        <p>exclusive@gmail.com</p>
                       <p>+88015-88888-9999</p>
                </div>
                <div className=' h-[200px]  text-white p-3'>
                        <h1 className='text-2xl font-semibold' >Account</h1>
                        <p>My Account</p>
                        <p>Login / Register</p>
                        <p>Cart</p>
                        <p>Wishlist</p>
                        <p>Shop</p>
                </div>
                <div className=' h-[200px]  text-white p-3'>
                        <h1 className='text-2xl font-semibold' >Quick Link</h1>
                        <p>Privacy Policy</p>
                        <p>Terms Of Use</p>
                        <p>FAQ</p>
                        <p>Contact</p>
                </div>
            
              
            </div>
        </>
    )
}

export default Footer
