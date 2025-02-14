import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Components/Card';

const Wishlist = () => {

  const wishlistProduct = useSelector(state => state.wishlist.wishlistProducts)
  
  

  if (!navigator.onLine) return <div className='h-screen'>  <h1 className='text-red-800 text-2xl m-5'>No Internet Connection</h1> </div>

  return (
    <>

      <div className='w-[80%] flex items-center justify-between m-auto my-15'>
        <p>Wishlist {`(${wishlistProduct?.length})`}</p>
        <button className='border-1 px-2 py-1 rounded-sm'>Move All To Bag</button>
       
      </div>
      <div className='w-[90%] m-auto my-2 min-h-[500px] flex flex-wrap'>
          {wishlistProduct?.map((item) => {
            return <Card key={item.id} {...item} />

          })}
        </div>

    </>
  )
}

export default Wishlist
