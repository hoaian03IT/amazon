import axios from "axios";

export const fetchProductsAPI = async () => await axios.get("/api/products");
export const fetchInfoProductBySlugAPI = async (slug) => await axios.get(`/api/products/slug/${slug}`);
export const fetchInfoProductByIdAPI = async (id) => await axios.get(`/api/products/id/${id}`);
export const signInAPI = async (payload) => await axios.post("/api/users/signin", payload);
export const signUpAPI = async (payload) => await axios.post("/api/users/signup", payload);
