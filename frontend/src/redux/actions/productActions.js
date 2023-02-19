import { createAction, createActions } from "redux-actions";

export const fetchProducts = createActions({
    fetchProductsRequest: undefined,
    fetchProductsSuccess: (payload) => payload,
    fetchProductsFail: (error) => error,
});

export const fetchInfoProduct = createActions({
    fetchInfoProductRequest: undefined,
    fetchInfoProductSuccess: (payload) => payload,
    fetchInfoProductFail: (error) => error,
});

export const clearError = createAction("clearError");
