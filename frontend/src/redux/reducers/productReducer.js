import { getType } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { INITIAL_STATE } from "~/app/initialState";
import { fetchCategories, fetchFilteredProduct, fetchInfoProduct, fetchProducts } from "../actions";

export const productReducer = (state = INITIAL_STATE.product, action) => {
    switch (action.type) {
        case getType(fetchInfoProduct.fetchInfoProductRequest):
        case getType(fetchProducts.fetchProductsRequest):
        case getType(fetchFilteredProduct.fetchFilteredProductRequest):
        case getType(fetchCategories.fetchCategoriesRequest):
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
        case getType(fetchFilteredProduct.fetchFilteredProductFail):
        case getType(fetchCategories.fetchCategoriesFail):
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

        case getType(fetchCategories.fetchCategoriesSuccess):
            return {
                ...state,
                loading: false,
                error: undefined,
                categories: action.payload,
            };
        case getType(fetchFilteredProduct.fetchFilteredProductSuccess):
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                quantityProducts: action.payload.quantityProducts,
                loading: false,
                error: undefined,
            };
        default:
            return state;
    }
};
