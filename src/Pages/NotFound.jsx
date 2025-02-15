import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {

    if (!navigator.onLine) return <div className='h-screen'>  <h1 className='text-red-800 text-2xl m-5'>No Internet Connection</h1> </div>

    return (
        <>
        <div className='min-h-screen'>

            <div className='py-15 w-[90%] m-auto'>
                <p className='text-neutral-500'> <Link to={"/"}>Home</Link> / <span className='text-black'>404 Error</span></p>
            </div>
            <div className=' p-2 text-center flex flex-col gap-4 items-center justify-center'>

            <h1 className=' text-4xl sm:text-7xl lg:text-9xl'>404 Not Found</h1>
            <p>Your visited page not found. You may go home page.</p>
            <Button style={{ backgroundColor: "var(--button2)"}} variant="contained">
                <Link to={"/"}>Back to home page</Link>
            </Button>
            </div>
        </div>

        </>
    )
}

export default NotFound
