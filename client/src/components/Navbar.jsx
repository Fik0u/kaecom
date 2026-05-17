import "./Navbar.css";

function Navbar({ cart }) {
  return (
    <nav className="navbar">
      <h1 className="logo">KAECOM 🛍️</h1>

      <div className="nav-right">
        <p className="cart-count">
          Panier ({cart.length})
        </p>
      </div>
    </nav>
  );
}

export default Navbar;