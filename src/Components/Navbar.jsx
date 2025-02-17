import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router';
import { setSearch } from '../Features/ApiSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {


    const pages = ['Home', 'Contact', 'About'];
    const input = React.useRef(null)
    const inputRes = React.useRef(null)

    const cartItems = useSelector(state => state.cart.items)
    const wishlistProduct = useSelector(state => state.wishlist.wishlistProducts)

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSubmit = (e, size) => {
        e.preventDefault()
        if (size === "desktop") {
            inputRes.current.value = ""
            if (!input.current.value.trim()) {
                return
            }

            dispatch(setSearch(input.current.value));
            input.current.value = ""
            navigate(`/products/category/search`)
        } else if (size === "phone") {
            input.current.value = ""
            if (!inputRes.current.value.trim()) {
                return
            }


            dispatch(setSearch(inputRes.current.value));
            inputRes.current.value = ""
            navigate(`/products/category/search`)
        }



    }



    return (
        <>
            <div className='py-3 px-2 bg-neutral-900 text-white flex items-center justify-center'>
                <div>
                    <p className='text-[9px]  sm:text-[14px]'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className='font-bold underline'>ShopNow</span></p>
                </div>

            </div>
            <AppBar position="static" sx={{ backgroundColor: "#fff", color: "black" }}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            EXCLUSIVE
                        </Typography>

                        {/* Responsive */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => {
                                        handleCloseNavMenu()
                                        navigate(page === "Home" ? "/" : page === "Contact" ? "/contact" : "/about")
                                    }} >
                                        <Typography sx={{ textAlign: 'center', color: "black" }} style={{ color: "black" }}>{page}</Typography>

                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            EXCLUSIVE
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Link to={page === "Home" ? "/" : page === "Contact" ? "/contact" : "/about"} key={page}>

                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'black', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>

                            <form className="hidden items-center max-w-sm mx-auto md:flex w-[300px]" onSubmit={(e) => handleSubmit(e, "desktop")}>
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                        </svg>
                                    </div>
                                    <input ref={input} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-neutral-500  block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" placeholder="What are you looking for?" required />
                                </div>
                                <button type="submit" className="cursor-pointer p-2.5 ms-2 text-sm font-medium text-black bg-neutral-300 rounded-lg border border-neutral-300 hover:bg-neutral-400 focus:outline-none  ">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </form>


                            <Link to="/wishlist">
                                <Badge badgeContent={wishlistProduct?.length || 0} color="secondary">
                                    <FavoriteBorderIcon />
                                </Badge>
                            </Link>
                            <Link to="/cart">
                                <Badge badgeContent={cartItems?.length || 0} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            </Link>

                        </Box>
                        <form className="flex items-center mx-auto md:hidden w-[100%] mb-2" onSubmit={(e) => handleSubmit(e, "phone")}>
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                    </svg>
                                </div>
                                <input ref={inputRes} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-neutral-500  block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500" placeholder="What are you looking for?" required />
                            </div>
                            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-black bg-neutral-300 rounded-lg border border-neutral-300 hover:bg-neutral-400 focus:outline-none  ">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </Toolbar>
                </Container>
            </AppBar>

        </>
    )
}

export default Navbar
