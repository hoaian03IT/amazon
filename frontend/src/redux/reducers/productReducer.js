import { getType } from "@reduxjs/toolkit";
import { INIT_STATE } from "~/app/state";
import { fetchProduct } from "../actions";

export const productReducer = (state = INIT_STATE.product, action) => {
    switch (action.type) {
        case getType(fetchProduct.fetchProductRequest):
            return {
                ...state,
                loading: true,
            };
        case getType(fetchProduct.fetchProductSuccess):
            return {
                ...state,
                products: action.payload,
                loading: false,
            };
        case getType(fetchProduct.fetchProductFail):
            return {
                ...state,
                error: action.payload,
                loading: true,
            };
        default:
            return state;
    }
};
