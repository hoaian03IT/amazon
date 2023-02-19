import axios from "axios";

export const fetchProductsAPI = async () => await axios.get("/api/products");

export const fetchInfoProductAPI = async (slug) => await axios.get(`/api/products/slug/${slug}`);
