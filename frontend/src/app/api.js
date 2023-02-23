import axios from "axios";

export const fetchProductsAPI = async () => await axios.get("/api/products");

export const fetchInfoProductBySlugAPI = async (slug) => await axios.get(`/api/products/slug/${slug}`);

export const fetchInfoProductByIdAPI = async (id) => await axios.get(`/api/products/${id}`);
