import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";

function Home() {

  return (
    <div className="container">
      <motion.div className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>

  <div className="hero-left">

    <span className="hero-badge">
      Nouvelle collection 🔥
    </span>

    <h1>
      Découvrez les meilleures tendances mode
    </h1>

    <p>
      Explorez notre sélection moderne de vêtements,
      chaussures et accessoires.
    </p>

    <button>
      Shop Now
    </button>

  </div>

  <div className="hero-right">

    <img
      src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
      alt="Fashion"
    />

  </div>

</motion.div>

<motion.div className="categories-section"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}>

  <Link
    to="/category/homme"
    className="category-card"
  >
    <img
      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
      alt="Homme"
    />

    <div className="overlay">
      <h2>Homme</h2>
    </div>
  </Link>

  <Link
    to="/category/femme"
    className="category-card"
  >
    <img
      src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
      alt="Femme"
    />

    <div className="overlay">
      <h2>Femme</h2>
    </div>
  </Link>

  <Link
    to="/category/chaussure"
    className="category-card"
  >
    <img
      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
      alt="Chaussures"
    />

    <div className="overlay">
      <h2>Chaussures</h2>
    </div>
  </Link>

</motion.div>
    </div>
  );
}

export default Home;