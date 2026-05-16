import { useEffect, useState } from "react";
import { getProducts } from "./services/productService";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.prodsList);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>E-commerce MERN 🚀</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <h3>{product.name}</h3>
            <p>{product.price} DA</p>
            <p>{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;