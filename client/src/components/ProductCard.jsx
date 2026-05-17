import "./ProductCard.css";

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      
      <div className="product-image">
        <img
          src="https://via.placeholder.com/150"
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>

        <div className="price">
          {product.price} DA
        </div>

        <button onClick={() => addToCart(product)}>
          Ajouter au panier
        </button>
      </div>

    </div>
  );
}

export default ProductCard;