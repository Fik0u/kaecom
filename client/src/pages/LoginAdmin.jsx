import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:1999/api/admin/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success("Connexion admin réussie 🔥");

      navigate("/admin");

    } catch (error) {
      toast.error("Erreur de connexion ❌");
    }
  };

  return (
    <div className="container">

      <h1>Admin Login 🔐</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default LoginAdmin;