import { takeLatest } from "redux-saga/effects";
import * as actions from "~/redux/actions";
import { fetchOrderSaga, placeOrderSaga } from "./orderSaga";
import { fetchInfoProductSaga, fetchProductsSaga } from "./productSaga";
import { signInSaga, signUpSaga } from "./userSaga";

export default function* mySaga() {
    yield takeLatest(actions.fetchProducts.fetchProductsRequest, fetchProductsSaga);
    yield takeLatest(actions.fetchInfoProduct.fetchInfoProductRequest, fetchInfoProductSaga);
    yield takeLatest(actions.signIn.signInRequest, signInSaga);
    yield takeLatest(actions.signUp.signUpRequest, signUpSaga);
    yield takeLatest(actions.placeOrder.placeOrderRequest, placeOrderSaga);
    yield takeLatest(actions.fetchOrder.fetchOrderRequest, fetchOrderSaga);
}
