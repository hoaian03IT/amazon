import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "~/app/api";
import * as actions from "~/redux/actions";

function* fetchProducts() {
    try {
        const res = yield call(api.fetchProductsAPI);
        yield put(actions.fetchProducts.fetchProductsSuccess(res.data));
    } catch (error) {
        yield put(actions.fetchProducts.fetchProductsFail(error.message));
    }
}

function* fetchInfoProduct(action) {
    try {
        const res = yield call(api.fetchInfoProductAPI, action.payload);
        yield put(actions.fetchInfoProduct.fetchInfoProductSuccess(res.data));
    } catch (error) {
        yield put(actions.fetchInfoProduct.fetchInfoProductFail(error.message));
    }
}

export default function* mySaga() {
    yield takeLatest(actions.fetchProducts.fetchProductsRequest, fetchProducts);
    yield takeLatest(actions.fetchInfoProduct.fetchInfoProductRequest, fetchInfoProduct);
}
