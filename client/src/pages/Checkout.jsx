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

    try {
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

      const res = await axios.post(
        "http://localhost:1999/api/orders/create",
        orderData
      );

      console.log("Order success:", res.data);
      alert("Commande envoyée !");
      setCart([]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout 🧾</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="customerName"
          placeholder="Nom"
          onChange={handleChange}
        />
        <br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br />

        <input
          name="phone"
          placeholder="Téléphone"
          onChange={handleChange}
        />
        <br />

        <input
          name="address"
          placeholder="Adresse"
          onChange={handleChange}
        />
        <br />

        <button type="submit">Commander</button>
      </form>
    </div>
  );
}

export default Checkout;