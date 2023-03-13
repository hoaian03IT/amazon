import { createAction, createActions } from "redux-actions";

export const fetchOrder = createActions({
    fetchOrderRequest: undefined,
    fetchOrderSuccess: (payload) => payload,
    fetchOrderFail: (err) => err,
});

export const payOrder = createActions({
    payOrderRequest: (payload) => payload,
    payOrderSuccess: (payload) => payload,
    payOrderFail: (err) => err,
});

export const fetchOrdersHistory = createActions({
    fetchOrdersHistoryRequest: (payload) => payload,
    fetchOrdersHistorySuccess: (payload) => payload,
    fetchOrdersHistoryFail: (err) => err,
});

export const payOrderReset = createAction("payOrderReset");
