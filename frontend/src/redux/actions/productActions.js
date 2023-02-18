import { createActions } from "redux-actions";

export const fetchProduct = createActions({
    fetchProductRequest: undefined,
    fetchProductSuccess: (payload) => payload,
    fetchProductFail: (error) => error,
});
