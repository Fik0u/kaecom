import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cart }) {
  return (
    <nav className="navbar">
      <div className="nav-container container">

        <Link to="/" className="logo">
          KAECOM 🛍️
        </Link>

        <div className="nav-links">
          <Link to="/">Produits</Link>
          <Link to="/cart">
            Panier <span className="badge">{cart.length}</span>
          </Link>
          <Link to="/checkout">Checkout</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;