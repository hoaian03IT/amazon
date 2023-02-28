import { cartItemKey, paymentMethodKey, shippingAddressKey, userKey } from "~/constants";

export const INITIAL_STATE = {
    product: {
        products: [],
        product: undefined,
        loading: false,
        error: undefined,
    },
    cart: {
        cartItems: JSON.parse(localStorage.getItem(cartItemKey)) || [],
        shippingAddress: JSON.parse(localStorage.getItem(shippingAddressKey)) || undefined,
        paymentMethod: JSON.parse(localStorage.getItem(paymentMethodKey)) || undefined,
    },
    user: {
        userInfo: JSON.parse(localStorage.getItem(userKey)) || undefined,
        loading: false,
        error: undefined,
    },
};
