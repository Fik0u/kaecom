import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import LoginAdmin from "./pages/LoginAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import { getProducts } from "./services/productService";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
});
  const [products, setProducts] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {
    const exist = cart.find((item) => item._id === product._id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success("Produit ajouté au panier 🛒");
  };

  // DECREASE
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
    toast.error("Produit supprimé du panier ❌");
  };

  useEffect(() => {
  const fetchProducts = async () => {
    const res = await getProducts();

    setProducts(res.data.prodsList);
  };

  fetchProducts();
}, []);

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  return (
    <BrowserRouter>
      <Navbar cart={cart} products={products} />

      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} />}
        />

        <Route path="/products" element={<CategoryPage addToCart={addToCart} />} />
        
        <Route path="/category/:name" element={<CategoryPage addToCart={addToCart} />} />

        <Route
  path="/product/:id"
  element={<ProductDetails addToCart={addToCart} />}
/>

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} />}
        />

        <Route
  path="/admin-login"
  element={<LoginAdmin />}
/>

        <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
        
      </Routes>
      
      <Footer />

      <ToastContainer
  position="top-right"
  autoClose={2000}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover
/>
    </BrowserRouter>
  );
}

export default App;