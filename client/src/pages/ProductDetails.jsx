import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );

        setProduct(res.data.prod);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

return (
  <div className="details-page container">

    <div className="details-card">

      <div className="details-image">

        <img
          src={
            product.imageUrl ||
            "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlcyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D"
          }
          alt={product.name}
        />

      </div>

      <div className="details-info">

        <span className="details-category">
          {product.category}
        </span>

        <h1>{product.name}</h1>

        <p className="details-description">
          {product.description}
        </p>

        <h2 className="details-price">
          {product.price} DA
        </h2>

        <button
          className="details-btn"
          onClick={() => addToCart(product)}
        >
          Ajouter au panier 🛒
        </button>

      </div>

    </div>

  </div>
);
}

export default ProductDetails;