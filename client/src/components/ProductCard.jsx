function ProductCard({ product, addToCart }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <h3>{product.name}</h3>
      <p>{product.price} DA</p>
      <p>{product.category}</p>

      <button onClick={() => addToCart(product)}>
        Ajouter au panier
      </button>
    </div>
  );
}

export default ProductCard;