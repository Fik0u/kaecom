import { useState } from "react";
import axios from "axios";

function Checkout({ cart, setCart }) {
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    await axios.post(
      "http://localhost:1999/api/orders",
      orderData
    );

    alert("Commande envoyée !");
    setCart([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout 🧾</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="customerName"
          placeholder="Nom"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Téléphone"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Adresse"
          onChange={handleChange}
        />

        <button type="submit">Commander</button>
      </form>
    </div>
  );
}

export default Checkout;