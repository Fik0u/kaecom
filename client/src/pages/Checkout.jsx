import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
  toast.error("Votre panier est vide 🛒");
  return;
}

    const orderData = {
      ...form,
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalPrice: cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

 try {
    await axios.post("http://localhost:1999/api/orders/create", orderData);

    setCart([]);

    toast.success("Commande confirmée 🎉");

    navigate("/");

  } catch (error) {
    console.error("Order error:", error);
    toast.error("Erreur lors de la commande ❌");
  }
  };

  return (
    <div className="checkout-page container">

      <h1>Checkout 🧾</h1>

      <form className="checkout-form" onSubmit={handleSubmit}>

        <input
          name="customerName"
          placeholder="Nom complet"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Téléphone"
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Adresse de livraison"
          onChange={handleChange}
          required
        />

        <div className="summary">
          Total :
          <strong>
            {cart.reduce(
              (acc, item) =>
                acc + item.price * item.quantity,
              0
            )} DA
          </strong>
        </div>

        <button type="submit">
          Confirmer la commande
        </button>

      </form>

    </div>
  );
}

export default Checkout;