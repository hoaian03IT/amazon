import { getType } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { INITIAL_STATE } from "~/app/initialState";
import { fetchInfoProduct, fetchProducts } from "../actions";

export const productReducer = (state = INITIAL_STATE.product, action) => {
    switch (action.type) {
        case getType(fetchInfoProduct.fetchInfoProductRequest):
        case getType(fetchProducts.fetchProductsRequest):
            return {
                ...state,
                loading: true,
            };
        case getType(fetchProducts.fetchProductsSuccess):
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: undefined,
            };
        case getType(fetchInfoProduct.fetchInfoProductFail):
        case getType(fetchProducts.fetchProductsFail):
            toast.error(action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case getType(fetchInfoProduct.fetchInfoProductSuccess):
            return {
                ...state,
                product: action.payload,
                loading: false,
                error: undefined,
            };
        default:
            return state;
    }
};
