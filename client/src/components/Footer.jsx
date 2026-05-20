import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container container">

        <div className="footer-brand">
          <h2>KAECOM 🛍️</h2>

          <p>
            Votre boutique moderne de vêtements,
            chaussures et accessoires.
          </p>
        </div>

        <div className="footer-links">

          <h3>Catégories</h3>

          <a href="/category/homme">
            Homme
          </a>

          <a href="/category/femme">
            Femme
          </a>

          <a href="/category/chaussure">
            Chaussures
          </a>

        </div>

        <div className="footer-links">

          <h3>Navigation</h3>

          <a href="/">Accueil</a>

          <a href="/cart">Panier</a>

          <a href="/admin">Admin</a>

        </div>
        <div className="footer-links">

  <h3>Suivez-nous</h3>

  <div className="social-icons">

    <a href="#">
      <FaInstagram />
    </a>

    <a href="#">
      <FaFacebook />
    </a>

    <a href="#">
      <FaTiktok />
    </a>

  </div>

</div>

      </div>

      <div className="footer-bottom">
        © 2026 KAECOM — Tous droits réservés
      </div>

    </footer>
  );
}

export default Footer;