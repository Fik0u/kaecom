import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import { getProducts } from "./services/productService";

function App() {
  const [cart, setCart] = useState([]);
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
  };

  useEffect(() => {
  const fetchProducts = async () => {
    const res = await getProducts();

    setProducts(res.data.prodsList);
  };

  fetchProducts();
}, []);

  return (
    <BrowserRouter>
      <Navbar cart={cart} products={products} />

      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} />}
        />

        <Route path="/category/:name" element={<Home addToCart={addToCart} />} />

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
          path="/admin"
          element={<AdminDashboard />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;