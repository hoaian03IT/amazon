export const INITIAL_STATE = {
    product: {
        products: [],
        product: undefined,
        loading: true,
        error: "",
    },
    cart: {
        cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    },
};
