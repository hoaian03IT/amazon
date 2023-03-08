import { createActions } from "redux-actions";

export const fetchOrder = createActions({
    fetchOrderRequest: undefined,
    fetchOrderSuccess: (payload) => payload,
    fetchOrderFail: (err) => err,
});
