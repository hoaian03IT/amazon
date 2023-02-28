import { createAction } from "redux-actions";

export const addProductToCard = createAction("addProductToCart");
export const removeProductCart = createAction("removeProductCart");
export const addShippingAddress = createAction("addShippingAddress");
export const addPaymentMethod = createAction("addPaymentMethod");
