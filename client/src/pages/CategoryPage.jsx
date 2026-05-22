import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import "./CategoryPage.css";

function CategoryPage({ addToCart }) {
  const [products, setProducts] = useState([]);

  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts();

      let allProducts = res.data.prodsList;

if (name) {
  allProducts = allProducts.filter(
    (p) =>
      p.category.toLowerCase() ===
      name.toLowerCase()
  );
}

      setProducts(allProducts);
    };

    fetchData();
  }, [name]);

return (
  <div className="category-page container">

    <div className="category-header">

      <h1>
        {name
          ? `Catégorie : ${name}`
          : "Tous les produits"}
      </h1>

      <p>
        Découvrez notre sélection de produits
        de qualité
      </p>

    </div>

    <div className="products-grid">

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

export default CategoryPage;