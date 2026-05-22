import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ cart, products }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const searchRef = useRef();

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

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setFiltered([]);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);


  return (
    <nav className="navbar">

<div className="nav-container container">

  {/* LEFT */}

  <div className="nav-left">

    <Link to="/" className="logo">
      KAECOM 🛍️
    </Link>

  </div>

  {/* CENTER */}

  <div className="nav-center">

    <Link to="/products">Tous</Link>

    <Link to="/category/homme">
      Homme
    </Link>

    <Link to="/category/femme">
      Femme
    </Link>

    <Link to="/category/chaussure">
      Chaussures
    </Link>

  </div>

  {/* RIGHT */}

  <div className="nav-right">

    <div className="search-box" ref={searchRef}>

      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {filtered.length > 0 && (
        <div className="search-dropdown">

          {filtered.map((product) => (
<Link
  to={`/product/${product._id}`}
  key={product._id}
  className="search-item"
  onClick={() => {
    setSearch("");
    setFiltered([]);
  }}
>

  <img
    src={
      product.imageUrl ||
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlcyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D"
    }
    alt={product.name}
  />

  <div className="search-product-info">

    <p>{product.name}</p>

    <span>
      {product.price} DA
    </span>

  </div>

</Link>
          ))}

        </div>
      )}

    </div>

    <Link
      to="/cart"
      className="cart-icon"
    >
      <FaShoppingCart />

      <span className="cart-count">
        {cart.length}
      </span>
    </Link>

  </div>

</div>

    </nav>
  );
}

export default Navbar;