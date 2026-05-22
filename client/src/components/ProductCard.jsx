import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ProductCard.css";

function ProductCard({ product }) {

  return (
    <Link
  to={`/product/${product._id}`}
  style={{
    textDecoration: "none",
    color: "inherit",
  }}
>
    <motion.div className="product-card"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      
      <div className="product-image">
        <img
          src= { product.imageUrl || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlcyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D" }
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>

        <div className="price">
          {product.price} DA
        </div>
        <button> Voir Détails </button>
      </div>

    </motion.div>
    </Link>
  );
}

export default ProductCard;