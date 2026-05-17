function CartPage({
  cart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  setCart,
}) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Panier 🛒</h1>

      {cart.length === 0 && <p>Panier vide</p>}

      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{item.name}</h3>

          <p>
            {item.price} DA x {item.quantity}
          </p>

          <button onClick={() => decreaseQuantity(item._id)}>
            -
          </button>

          <button onClick={() => addToCart(item)}>+</button>

          <button onClick={() => removeFromCart(item._id)}>
            Supprimer
          </button>
        </div>
      ))}

      <h2>
        Total :
        {cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        )}{" "}
        DA
      </h2>

      <button onClick={() => setCart([])}>
        Vider le panier
      </button>
    </div>
  );
}

export default CartPage;