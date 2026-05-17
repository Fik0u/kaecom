import { useEffect, useState } from "react";
import { getProducts } from "./services/productService";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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
  
  const removeFromCart = (productId) => {
  setCart(cart.filter((item) => item._id !== productId));
};

const decreaseQuantity = (productId) => {
  setCart(
    cart
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.prodsList);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Navbar cart={cart} />

      {/* PRODUCTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* CART */}
      <Cart
        cart={cart}
        addToCart={addToCart}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        setCart={setCart}
      />

      {/* CHECKOUT */}

      <Checkout cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;