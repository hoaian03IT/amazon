import { getType } from "@reduxjs/toolkit";

import { INITIAL_STATE } from "~/app/initialState";
import { cartItemKey, paymentMethodKey, shippingAddressKey } from "~/constants";
import { addPaymentMethod, addProductToCard, addShippingAddress, removeProductCart } from "../actions";

export const cartReducer = (state = INITIAL_STATE.cart, action) => {
    switch (action.type) {
        case getType(addProductToCard): {
            const newItem = action.payload;
            const existItem = state.cartItems.find((item) => item._id === newItem._id);

            const cartItems = existItem
                ? state.cartItems.map((item) => (item._id === existItem._id ? newItem : item))
                : [...state.cartItems, newItem];

            localStorage.setItem(cartItemKey, JSON.stringify(cartItems));
            return { ...state, cartItems };
        }

        case getType(removeProductCart): {
            const cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
            localStorage.setItem(cartItemKey, JSON.stringify(cartItems));
            return { ...state, cartItems };
        }

        case getType(addShippingAddress):
            localStorage.setItem(shippingAddressKey, JSON.stringify(action.payload));
            return { ...state, shippingAddress: action.payload };

        case getType(addPaymentMethod):
            localStorage.setItem(paymentMethodKey, JSON.stringify(action.payload));
            return { ...state, paymentMethod: action.payload };
        default:
            return state;
    }
};
