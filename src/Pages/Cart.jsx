import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteCartItem, subTotalPrice, updateQuantity } from '../Features/CartSlice';
import { Button } from '@mui/material'
import { notify } from '../Utils/HelperFunctions';
import { Link, useNavigate } from 'react-router';
import { emptySearch } from '../Features/ApiSlice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const Cart = () => {

    const navigate = useNavigate()
    
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.items)
    const subTotal = useSelector(state => state.cart.subTotal)


    const handleQuantityChange = (e, id) => {
        const newQuantity = parseInt(e.target.value, 10) || 1;
        dispatch(updateQuantity({ id, quantity: newQuantity }));

    };
    const handleDelete = (id) => {
        dispatch(deleteCartItem(id))
        notify("error", "Product Remove From Cart")
    }
    
    useEffect(() => {
        dispatch(subTotalPrice())
    }, [cartItems])

    if (!navigator.onLine) return <div className='h-screen'>  <h1 className='text-red-800 text-2xl m-5'>No Internet Connection</h1> </div>

    return (
        <>

           

            <div className='py-15 w-[90%] m-auto'>
                <p className='text-neutral-500'> <Link to={"/"}>Home</Link> / <span className='text-black'>Cart</span></p>
            </div>

            <table style={{ borderSpacing: "15px", borderCollapse: "separate" }} className='m-auto w-[97%] md:w-[90%] mb-6' >
                <thead>
                    <tr className='p-4 h-[60px] rounded-sm' style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>

                        <th className='text-left text-[11px] sm:text-[16px] ps-1 sm:ps-6'>Product</th>
                        <th className='text-left text-[11px] sm:text-[16px] '>Price</th>
                        <th className='text-left text-[11px] sm:text-[16px] '>Quantity</th>
                        <th className='text-left text-[11px] sm:text-[16px] pe-1 '>Subtotal</th>
                    </tr>

                </thead>
                <tbody>

                    {cartItems?.map((product) => {
                        return <tr key={product.id}>
                            <td className='flex gap-2 items-center ps-1 sm:ps-6'>


                                <img className='w-[40px] sm:w-[54px]' src={product.thumbnail} alt="" />
                                <Link to={`/product/${product.id}`}>
                                    <p className='text-[11px] sm:text-[16px]'>{product.title}</p>
                                </Link>
                            </td>
                            <td className='text-[11px] sm:text-[16px]'>${product.discountedPrice}</td>
                            <td>
                                <div className='p-1 border-1 rounded-sm w-[30px] sm:w-[50px] flex h-[28px] sm:h-[35px]'>
                                    <input min={"1"} max={"10"} type="number" onChange={(e) => handleQuantityChange(e, product.id)} value={product.quantity} className='w-[100%] outline-none text-[11px] sm:text-[16px]' />
                                </div>
                            </td>
                            <td className='text-[11px] sm:text-[16px]'>
                                ${product.totalPrice}
                            </td>
                            <td className='text-[11px] sm:text-[16px]'>
                                <DeleteOutlineIcon onClick={() => handleDelete(product.id)} style={{ cursor: "pointer" }} />
                            </td>
                        </tr>
                    })}



                </tbody>
            </table>

            <div className='py-7 w-[90%] m-auto'>
                <button className='border-1 px-2 py-1 rounded-sm cursor-pointer' onClick={()=>{
                    dispatch(emptySearch())
                     navigate(`/products/category/all`)
                     }}>Return To Shop</button>
            </div>
            <div className='py-7 w-[90%] m-auto flex justify-between my-5 flex-wrap gap-3'>
                <div className='flex gap-3  h-[50px]'>

                    <input className='border-1 px-2 py-1 w-[200px] outline-none rounded-sm' type="text" placeholder='Coupon Code' />
                    <Button style={{ backgroundColor: "var(--button2)" }} variant="contained">Apply Coupon</Button>
                </div>

                <div className='border-1 px-2 py-3 w-[300px] rounded-sm lg:w-[400px]'>
                    <h1 className='text-xl font-semibold'>Cart Total</h1>
                    <div className='flex justify-between m-auto w-[90%] items-center border-b-1 border-neutral-400 py-3'>
                        <p>Subtotal:</p>
                        <p>${subTotal}</p>
                    </div>
                    <div className='flex justify-between m-auto w-[90%] items-center border-b-1 border-neutral-400 py-3'>
                        <p>Shipping:</p>
                        <p>Free</p>
                    </div>
                    <div className='flex justify-between m-auto w-[90%] items-center  py-3'>
                        <p>Total:</p>
                        <p>${subTotal}</p>
                    </div>
                    <div className='flex justify-center'>

                        <Button style={{ backgroundColor: "var(--button2)", margin: "auto" }} variant="contained">Proceed To Checkout</Button>
                    </div>
                </div>


            </div>

        </>
    )
}

export default Cart
