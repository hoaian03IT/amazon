import { takeLatest } from "redux-saga/effects";
import * as actions from "~/redux/actions";
import { fetchOrderSaga, fetchOrdersHistorySaga, payOrderSaga, placeOrderSaga } from "./orderSaga";
import { fetchCategoriesSaga, fetchFilteredProductSaga, fetchInfoProductSaga, fetchProductsSaga } from "./productSaga";
import { signInSaga, signUpSaga, updateUserInfoSaga } from "./userSaga";

export default function* mySaga() {
    yield takeLatest(actions.fetchProducts.fetchProductsRequest, fetchProductsSaga);
    yield takeLatest(actions.fetchInfoProduct.fetchInfoProductRequest, fetchInfoProductSaga);
    yield takeLatest(actions.signIn.signInRequest, signInSaga);
    yield takeLatest(actions.signUp.signUpRequest, signUpSaga);
    yield takeLatest(actions.placeOrder.placeOrderRequest, placeOrderSaga);
    yield takeLatest(actions.fetchOrder.fetchOrderRequest, fetchOrderSaga);
    yield takeLatest(actions.payOrder.payOrderRequest, payOrderSaga);
    yield takeLatest(actions.fetchOrdersHistory.fetchOrdersHistoryRequest, fetchOrdersHistorySaga);
    yield takeLatest(actions.updateUserInfo.updateUserInfoRequest, updateUserInfoSaga);
    yield takeLatest(actions.fetchFilteredProduct.fetchFilteredProductRequest, fetchFilteredProductSaga);
    yield takeLatest(actions.fetchCategories.fetchCategoriesRequest, fetchCategoriesSaga);
}
