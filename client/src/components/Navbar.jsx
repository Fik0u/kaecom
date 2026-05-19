import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ cart, products }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
  if (search.trim() === "") {
    setFiltered([]);
  } else {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(results);
  }
}, [search, products]);


  return (
    <nav className="navbar">

      <div className="nav-container container">

        <Link to="/" className="logo">
          KAECOM 🛍️
        </Link>

        <div className="nav-links">

          <Link to="/">Tous</Link>

          <Link to="/category/homme">
            Homme
          </Link>

          <Link to="/category/femme">
            Femme
          </Link>

          <Link to="/category/chaussure">
            Chaussures
          </Link>

          <Link to="/cart" className="cart-icon">
  <FaShoppingCart />

  <span className="cart-count">
    {cart.length}
  </span>
</Link>

        <div className="search-box">

  <FaSearch className="search-icon" />

  <input
    type="text"
    placeholder="Rechercher..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {filtered.length > 0 && (
    <div className="search-dropdown">

      {filtered.map((product) => (
        <div
          key={product._id}
          className="search-item"
        >
          {product.name}
        </div>
      ))}

    </div>
  )}

</div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;