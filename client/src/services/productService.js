import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/products/allProds`;

export const getProducts = async () => {
    return await axios.get(API_URL);
};