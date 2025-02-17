import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../Components/Card';
import { ToastContainer } from 'react-toastify';
import { notify } from '../Utils/HelperFunctions';
import { setToastify } from '../Features/CartSlice';

const Wishlist = () => {

  const dispatch = useDispatch();
  const wishlistProduct = useSelector(state => state.wishlist.wishlistProducts)
  const toaster = useSelector(state => state.cart.toastify);
  useEffect(() => {
    if (toaster.toast) {
      notify(toaster.theme, toaster.msg)
      dispatch(setToastify({ toast: false }))
    }
  }, [toaster])


  if (!navigator.onLine) return <div className='h-screen'>  <h1 className='text-red-800 text-2xl m-5'>No Internet Connection</h1> </div>

  return (
    <>
      <ToastContainer
        position="bottom-right"
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

      <div className='w-[80%] flex items-center justify-between m-auto my-15'>
        <p>Wishlist {`(${wishlistProduct?.length})`}</p>
        <button className='border-1 px-2 py-1 rounded-sm'>Move All To Bag</button>

      </div>
      <div className='w-[90%] m-auto md:gap-1 gap-[3px] mb-15 min-h-[500px] flex flex-wrap'>
        {wishlistProduct?.map((item) => {
          return <Card key={item.id} {...item} />

        })}
      </div>

    </>
  )
}

export default Wishlist
