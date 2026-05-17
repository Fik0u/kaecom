import { useEffect, useState } from "react";
import { getProducts } from "./services/productService";
import Checkout from "./pages/Checkout";

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
      <h1>E-commerce MERN 🚀</h1>

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
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{product.name}</h3>
            <p>{product.price} DA</p>
            <p>{product.category}</p>

            <button onClick={() => addToCart(product)}>
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <h2 style={{ marginTop: "40px" }}>Panier 🛒</h2>

{cart.map((item, index) => (
  <div key={index}>
    <p>
      {item.name} - {item.price} DA x {item.quantity}
    </p>

    <button onClick={() => decreaseQuantity(item._id)}>
      -
    </button>

    <button onClick={() => addToCart(item)}>
      +
    </button>

    <button onClick={() => removeFromCart(item._id)}>
      Supprimer
    </button>
  </div>
))}
      <h3>
  Total :
  {cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )}{" "}
  DA
</h3>
<button onClick={() => setCart([])}>
  Vider le panier
</button>

      <Checkout cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;