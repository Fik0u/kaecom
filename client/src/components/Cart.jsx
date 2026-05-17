function Cart({
  cart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  setCart,
}) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Panier 🛒</h2>

      {cart.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                backgroundColor: "white",
              }}
            >
              <h4>{item.name}</h4>

              <p>{item.price} DA</p>

              <p>Quantité : {item.quantity}</p>

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
            {" "}
            {cart.reduce(
              (acc, item) =>
                acc + item.price * item.quantity,
              0
            )}{" "}
            DA
          </h3>

          <button onClick={() => setCart([])}>
            Vider le panier
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;