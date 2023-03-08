import { call, put } from "redux-saga/effects";
import * as api from "~/app/api";
import * as actions from "~/redux/actions";
import { getError } from "~/utils/getError";

function* placeOrderSaga(action) {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            token,
            navigate,
        } = action.payload;

        const res = yield call(api.placeOrderAPI, {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            token,
        });

        yield put(
            actions.placeOrder.placeOrderSuccess({
                data: res.data,
                navigate: navigate,
            })
        );
    } catch (error) {
        console.log(error);
        yield put(actions.placeOrder.placeOrderFail(getError(error)));
    }
}

function* fetchOrderSaga(action) {
    try {
        const res = yield call(api.fetchOrderAPI, action.payload);
        console.log(res);
        yield put(actions.fetchOrder.fetchOrderSuccess(res.data));
    } catch (error) {
        yield put(actions.fetchOrder.fetchOrderFail(getError(error)));
    }
}

export { fetchOrderSaga, placeOrderSaga };
