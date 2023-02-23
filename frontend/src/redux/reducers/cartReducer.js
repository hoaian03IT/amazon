import { getType } from "@reduxjs/toolkit";

import { INITIAL_STATE } from "~/app/initialState";
import { addProductToCard, removeProductCart } from "../actions/cartActions";

export const cartReducer = (state = INITIAL_STATE.cart, action) => {
    switch (action.type) {
        case getType(addProductToCard): {
            const newItem = action.payload;
            const existItem = state.cartItems.find((item) => item._id === newItem._id);

            const cartItems = existItem
                ? state.cartItems.map((item) => (item._id === existItem._id ? newItem : item))
                : [...state.cartItems, newItem];

            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            return { ...state, cartItems };
        }

        case getType(removeProductCart): {
            const cartItems = state.cartItems.filter((item) => item._id !== action.payload._id);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            return { ...state, cartItems };
        }
        default:
            return state;
    }
};
