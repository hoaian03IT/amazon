import axios from "axios";

export const fetchProductsAPI = async () => await axios.get("/api/products");
export const fetchInfoProductBySlugAPI = async (slug) => await axios.get(`/api/products/slug/${slug}`);
export const fetchInfoProductByIdAPI = async (id) => await axios.get(`/api/products/id/${id}`);
export const signInAPI = async (payload) => await axios.post("/api/users/signin", payload);
export const signUpAPI = async (payload) => await axios.post("/api/users/signup", payload);
export const placeOrderAPI = async (payload) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, token } = payload;

    return await axios.post(
        "/api/orders",
        {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
export const fetchOrderAPI = async (payload) => {
    const { id, token } = payload;
    return await axios.get(`/api/orders/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const payOrderAPI = async (payload) => {
    const { id, details, token } = payload;
    return await axios.post(`/api/orders/${id}/pay`, details, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
export const fetchOrdersHistoryAPI = async (payload) =>
    await axios.get("/api/orders/mine", {
        headers: {
            Authorization: `Bearer ${payload.token}`,
        },
    });
export const updateUserInfo = async (payload) => {
    const { avatar, name, password, token } = payload;
    return await axios.post(
        "/api/users/updateInfo",
        { avatar, name, password },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
