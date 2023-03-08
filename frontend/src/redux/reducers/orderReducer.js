import { getType } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { INITIAL_STATE } from "~/app/initialState";
import { routesPath } from "~/config/route";
import { cartItemKey } from "~/constants";
import { fetchOrder, placeOrder } from "../actions";

export const orderReducer = (state = INITIAL_STATE.order, action) => {
    switch (action.type) {
        case getType(placeOrder.placeOrderRequest):
        case getType(fetchOrder.fetchOrderRequest):
            return { ...state, loading: true };

        case getType(placeOrder.placeOrderFail):
        case getType(fetchOrder.fetchOrderFail):
            toast.error(action.payload);
            return { ...state, loading: false, error: action.payload };

        case getType(placeOrder.placeOrderSuccess):
            toast.success("Place order successfully");
            const { navigate, data } = action.payload;
            navigate(routesPath.orderDetail.slice(0, 12) + "/" + data._id);

            localStorage.removeItem(cartItemKey);
            return {
                ...state,
                loading: false,
                orderInfo: data,
            };

        case getType(fetchOrder.fetchOrderSuccess):
            return {
                ...state,
                loading: false,
                error: undefined,
                orderInfo: action.payload,
            };

        default:
            return state;
    }
};
