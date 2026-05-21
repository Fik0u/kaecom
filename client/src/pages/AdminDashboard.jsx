import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
  name: "",
  price: "",
  category: "",
  imageUrl: "",
});
  const [editId, setEditId] = useState(null);

  // FETCH ORDERS
  const getOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/all`
      );

      setOrders(res.data.orders);

    } catch (error) {
      console.log(error);
    }
  };
  // FETCH PRODUCTS
  const getProducts = async () => {
    try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/products/allProds`
    );

    setProducts(res.data.prodsList);

  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const logout = () => {
  localStorage.removeItem("token");

  toast.info("Déconnexion réussie 👋");

  navigate("/admin-login");
};


  useEffect(() => {
    getOrders();
    getProducts();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/updateStatus/${id}`,
        { status }
      );

      getOrders();

    } catch (error) {
      console.log(error);
    }
  };
  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/products/${id}`
    );

    getProducts();

  } catch (error) {
    console.log(error);
  }
  };
  // ADD PRODUCT
  const addProduct = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/products/add`,
      form
    );

    getProducts();

    setForm({
      name: "",
      price: "",
      category: "",
      imageUrl: "",
    });

  } catch (error) {
    console.log(error);
  }
};
  // EDIT PRODUCT
  const editProduct = (product) => {
  setForm({
    name: product.name,
    price: product.price,
    category: product.category,
    imageUrl: product.imageUrl,
  });

  setEditId(product._id);
};
  const updateProduct = async (e) => {
  e.preventDefault();

  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/products/${editId}`,
      form
    );

    getProducts();

    setForm({
      name: "",
      price: "",
      category: "",
      imageUrl: "",
    });

    setEditId(null);

  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="admin-page container">

      <h1>Admin Dashboard 📦</h1>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      <div className="orders-list">

        {orders.map((order) => (
          <div key={order._id} className="order-card">

            <div className="order-info">
              <h3>{order.customerName}</h3>

              <p>{order.phone}</p>

              <p>{order.address}</p>

              <p>
                <strong>Total :</strong>
                {" "}
                {order.totalPrice} DA
              </p>

              <p>
                <strong>Status :</strong>
                {" "}
                {order.status}
              </p>
            </div>

            <div className="status-actions">

              <select
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                defaultValue={order.status}
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>

            </div>

          </div>
        ))}

      </div>
      <form className="add-product-form" onSubmit={editId ? updateProduct : addProduct}>

  <h2>Ajouter / Modifier un produit 🛍️</h2>

  <input
    type="text"
    name="name"
    placeholder="Nom produit"
    value={form.name}
    onChange={handleChange}
  />

  <input
    type="number"
    name="price"
    placeholder="Prix"
    value={form.price}
    onChange={handleChange}
  />

  <input
    type="text"
    name="category"
    placeholder="Catégorie"
    value={form.category}
    onChange={handleChange}
  />
  <input
    type="text"
    name="imageUrl"
    placeholder="URL de l'image"
    value={form.imageUrl}
    onChange={handleChange}
  />

  <button type="submit">
  {editId ? "Modifier Produit" : "Ajouter Produit"}
</button>

</form>

      <h1 style={{ marginTop: "40px" }}>
  Produits 🛍️
</h1>

<div className="orders-list">

{products.map((product) => (
  <div key={product._id} className="order-card">

    <div className="order-info">
      <h3>{product.name}</h3>

      <p>{product.category}</p>

      <p>
        <strong>Prix :</strong>
        {" "}
        {product.price} DA
      </p>
    </div>

    <div className="status-actions">

      <button
        className="danger"
        onClick={() => deleteProduct(product._id)}
      >
        Supprimer
      </button>

      <button onClick={() => editProduct(product)}>
  Modifier
</button>

    </div>

  </div>
))}

</div>

    </div>
  );
}

export default AdminDashboard;