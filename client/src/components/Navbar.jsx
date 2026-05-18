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

          <Link to="/">Tous</Link>

          <Link to="/category/homme">
            Homme
          </Link>

          <Link to="/category/femme">
            Femme
          </Link>

          <Link to="/category/chaussures">
            Chaussures
          </Link>

          <Link to="/cart">
            Panier ({cart.length})
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;