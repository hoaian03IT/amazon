import { getType } from "@reduxjs/toolkit";

import { INITIAL_STATE } from "~/app/initialState";
import { getError } from "~/utils/getError";
import { clearError, fetchInfoProduct, fetchProducts } from "../actions";

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
            };
        case getType(fetchInfoProduct.fetchInfoProductFail):
        case getType(fetchProducts.fetchProductsFail):
            return {
                ...state,
                error: getError(action.payload),
                loading: false,
            };
        case getType(fetchInfoProduct.fetchInfoProductSuccess):
            return {
                ...state,
                product: action.payload,
                loading: false,
            };
        case getType(clearError): {
            return {
                ...state,
                error: "",
            };
        }
        default:
            return state;
    }
};
