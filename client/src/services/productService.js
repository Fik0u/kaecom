import axios from "axios";

const API_URL = "http://localhost:1999/api/products/allProds";

export const getProducts = async () => {
    return await axios.get(API_URL);
};