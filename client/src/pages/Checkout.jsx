import { useState } from "react";
import axios from "axios";


function Checkout() {
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
        items: [
          {
            productId: "test-id", 
            name: "Test Product",
            price: 1000,
            quantity: 1,
          },
        ],
        totalPrice: 1000,
      };

      const res = await axios.post(
        "http://localhost:1999/api/orders",
        orderData
      );

      console.log("Order success:", res.data);
      alert("Commande envoyée !");
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