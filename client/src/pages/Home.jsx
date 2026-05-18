import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts();

      let allProducts = res.data.prodsList;

      if (name) {
        allProducts = allProducts.filter(
          (p) =>
            p.category.toLowerCase() === name.toLowerCase()
        );
      }

      setProducts(allProducts);
    };

    fetchData();
  }, [name]);

  return (
    <div className="container">
      <h1>
        {name ? `Catégorie : ${name}` : "Tous les produits"}
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;