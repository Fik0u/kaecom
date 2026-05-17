import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cart }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        KAECOM 🛍️
      </Link>

      <div className="nav-right">
        <Link to="/cart" className="cart-count">
          Panier ({cart.length})
        </Link>

        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  );
}

export default Navbar;