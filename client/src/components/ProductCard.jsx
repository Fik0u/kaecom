import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, addToCart }) {
  return (
    <Link
  to={`/product/${product._id}`}
  style={{
    textDecoration: "none",
    color: "inherit",
  }}
>
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
    </Link>
  );
}

export default ProductCard;