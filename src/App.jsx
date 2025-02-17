import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import ProductDetail from './Pages/ProductDetail'
import Wishlist from "./Pages/Wishlist"
import Cart from './Pages/Cart'
import ProductsPage from './Pages/ProductsPage'
import NotFound from './Pages/NotFound'
import ScrollToTop from './Utils/ScrollToTop'
import { ToastContainer } from "react-toastify";

function Layout() {
  const location = useLocation(); // ✅ Now useLocation is inside Router

  return (
    <>
      <ScrollToTop />
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
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/products/category/:categorySlug" element={<ProductsPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!location.pathname.startsWith('/products/category/') && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout /> {/* ✅ Now useLocation will work properly inside Layout */}
    </Router>
  );
}