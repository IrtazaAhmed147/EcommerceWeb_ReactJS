import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router';
import Card from '../Components/Card';
import {
    emptySearch,
    getAllProducts,
    getCategoriesList,
    getProductByCategories,
    getProductBySearch
} from '../Features/ApiSlice';
import '../CSS/productPage.css';

const ProductsPage = () => {
    const { categorySlug } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlistProduct = useSelector(state => state.wishlist.wishlistProducts);
    const categoriesList = useSelector(state => state.api.categoryList);
    const searchValue = useSelector(state => state.api.search);
    const listLoader = useSelector(state => state.loader.categoryListApi);
    const loader = useSelector(state => state.loader.AllProductsApi);

    const data = useSelector(state => state.api.products);
    const { products, total } = data;

    const [skipNo, setSkipNo] = useState(0);
    const [allProducts, setAllProducts] = useState([]);

    // Wishlist Check
    const isInWishlist = (id) => wishlistProduct.some((item) => item.id === id);

    useEffect(() => {
        setAllProducts([]); // Clear previous products
        setSkipNo(0); // Reset pagination
        loadProducts(0); // Initial fetch
    }, [categorySlug, searchValue]);

    const loadProducts = (skip) => {
        console.log("chala");

        if (searchValue) {
            dispatch(getProductBySearch(searchValue));
        } else {
            if (categorySlug !== "all") {
                dispatch(getProductByCategories(categorySlug));
            } else {
                dispatch(getAllProducts(skip));
            }
        }
    };

    useEffect(() => {
        if (categoriesList.length === 0) {
            dispatch(getCategoriesList());
        }
    }, [dispatch]);

    useEffect(() => {
        console.log(products);
        console.log(total);
        console.log(allProducts);
        if (categorySlug !== "all") {
            setAllProducts(products);
            return;
        }

        if (products?.length > 0) {
            setAllProducts(prevProducts => {
                // Ensure we only append new products, avoiding duplicates
                const newProducts = products.filter(p => !prevProducts.some(prev => prev.id === p.id));
                return [...prevProducts, ...newProducts];
            });
        }
        console.log(products);
        console.log(total);
        console.log(allProducts);

    }, [products]);

    const fetchMoreData = () => {
        const newSkip = skipNo + 20;
        setSkipNo(newSkip);

        dispatch(getAllProducts(newSkip)).then((response) => {
            if (response?.payload?.products) {
                setAllProducts(prevProducts => [
                    ...prevProducts,
                    ...response.payload.products
                ]);
            }
        });
    };

    return (
        <div className='block w-full md:flex'>
            {/* Category Dropdown for Mobile */}
            {window.innerWidth <= 767 && (
                <div className='w-full my-3 px-2 block md:hidden'>
                    <select
                        value={categorySlug === "all" ? "Select Category" : categorySlug}
                        className='w-full p-2 cursor-pointer rounded-md outline-none bg-neutral-300'
                        onChange={(e) => {
                            dispatch(emptySearch());
                            navigate(`/products/category/${e.target.value}`);
                        }}
                    >
                        <option value="Select Category" disabled>Select Category</option>
                        <option value="all">All</option>
                        {categoriesList?.map((category) => (
                            <option key={category.slug} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Sidebar for Desktop */}
            <div className='w-[25%] lg:w-[20%] border-r pt-7 pe-4 justify-end hidden md:flex'>
                <ul className='flex flex-col gap-[10px] mb-5'>
                    {listLoader ? (
                        <div className='w-[150px] h-[400px] flex items-center justify-center'>
                            <CircularProgress color="inherit" />
                        </div>
                    ) : (
                        <>
                            <li className='duration-[0.5s] transition-all ease-in-out flex justify-between w-[160px] px-2 rounded-md hover:bg-neutral-200 cursor-pointer' onClick={() => dispatch(emptySearch())}>
                                <Link to={"/products/category/all"} style={{ width: "100%" }} >
                                    <p>All</p>
                                    <p className='hidden'><NavigateNextIcon /></p>
                                </Link>
                            </li>
                            {categoriesList?.map((category) => (
                                <li key={category.slug} onClick={() => dispatch(emptySearch())} className='duration-[0.5s] transition-all ease-in-out flex justify-between w-[160px] px-2 rounded-md hover:bg-neutral-200 cursor-pointer'>
                                    <Link to={`/products/category/${category.slug}`} style={{ width: "100%" }}>
                                        <p>{category.name}</p>
                                        <p className='hidden'><NavigateNextIcon /></p>
                                    </Link>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>

            {/* Product List with Infinite Scroll */}
            <div className='products-wrapper w-[100%] md:w-[75%] px-3 my-5 m-auto min-h-screen'>
                <h1 className='text-4xl font-semibold my-3'>
                    {searchValue || (categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)).split("-").join(" ")}
                </h1>


                {!loader && categorySlug !== "all" && allProducts.length === 0 ? (
                    <div className="w-full h-screen flex items-center justify-center">
                        <CircularProgress color="inherit" />
                    </div>
                ) : (
                    <>
                        {!navigator.onLine && <h1 className='text-red-800 text-2xl my-5'>No Internet Connection</h1>}

                        {categorySlug === "all" ? (
                            <InfiniteScroll
                                dataLength={allProducts.length}
                                next={fetchMoreData}
                                hasMore={allProducts.length < total}
                                loader={<div className="loader-container"><CircularProgress color="inherit" /></div>}
                                scrollThreshold={0.9}
                            >
                                <div className='flex flex-wrap md:gap-3 p-2'>
                                    {allProducts.map((item) => (
                                        <Card key={item.id} {...item} wishlist={isInWishlist(item.id)} />
                                    ))}
                                </div>
                            </InfiniteScroll>
                        ) : (
                            <div className='flex flex-wrap md:gap-3 p-2'>
                                {allProducts.map((item) => (
                                    <Card key={item.id} {...item} wishlist={isInWishlist(item.id)} />
                                ))}
                            </div>
                        )}
                    </>
                )}

           
            </div>
        </div>
    );
};

export default ProductsPage;
