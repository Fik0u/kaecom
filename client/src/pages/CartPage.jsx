import "./CartPage.css";

function CartPage({
  cart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  setCart,
}) {
  return (
    <div className="container cart-page">

      <h1>Mon Panier 🛒</h1>

      {cart.length === 0 ? (
        <p className="empty">Ton panier est vide</p>
      ) : (
        <div className="cart-layout">

          {/* LEFT - ITEMS */}
          <div className="cart-items">

            {cart.map((item) => (
              <div key={item._id} className="cart-card">

                <div>
                  <h3>{item.name}</h3>
                  <p>{item.price} DA</p>
                  <p>Quantité : {item.quantity}</p>
                </div>

                <div className="cart-actions">
                  <button onClick={() => decreaseQuantity(item._id)}>
                    -
                  </button>

                  <button onClick={() => addToCart(item)}>
                    +
                  </button>

                  <button
                    className="danger"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Supprimer
                  </button>
                </div>

              </div>
            ))}

          </div>

          {/* RIGHT - SUMMARY */}
          <div className="cart-summary">

            <h2>Résumé</h2>

            <p>
              Total :
              <strong>
                {cart.reduce(
                  (acc, item) =>
                    acc + item.price * item.quantity,
                  0
                )} DA
              </strong>
            </p>

            <button onClick={() => setCart([])}>
              Vider le panier
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default CartPage;