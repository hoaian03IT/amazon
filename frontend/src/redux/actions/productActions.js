import { createActions } from "redux-actions";

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

export const fetchFilteredProduct = createActions({
    fetchFilteredProductRequest: (payload) => payload,
    fetchFilteredProductSuccess: (payload) => payload,
    fetchFilteredProductFail: (err) => err,
});

export const fetchCategories = createActions({
    fetchCategoriesRequest: undefined,
    fetchCategoriesSuccess: (payload) => payload,
    fetchCategoriesFail: (err) => err,
});
