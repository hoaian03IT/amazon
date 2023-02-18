import axios from "axios";

export const fetchProductAPI = async () => await axios.get("/product/api");
