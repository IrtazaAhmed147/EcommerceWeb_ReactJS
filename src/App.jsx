import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetail from './Pages/ProductDetail'
import Wishlist from "./Pages/Wishlist"
import Cart from './Pages/Cart'
import ProductsPage from './Pages/ProductsPage'

function App() {

  return (
    <>
      <Router>
        <Navbar />


        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:productId' element={<ProductDetail />} />
          <Route path='/products/category/:categorySlug' element={<ProductsPage />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>


        <Footer />
      </Router>
    </>
  )
}

export default App
