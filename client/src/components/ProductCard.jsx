function ProductCard({ product, addToCart }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        backgroundColor: "white",
      }}
    >
      <h3>{product.name}</h3>

      <p>{product.category}</p>

      <h4>{product.price} DA</h4>

      <button onClick={() => addToCart(product)}>
        Ajouter au panier
      </button>
    </div>
  );
}

export default ProductCard;