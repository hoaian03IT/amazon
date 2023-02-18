import { call, put, takeLatest } from "redux-saga/effects";
import * as api from "~/app/api";
import * as actions from "~/redux/actions";

function* fetchProduct() {
    try {
        const res = yield call(api.fetchProductAPI);
        console.log("[Products]: ", res.data);
        yield put(actions.fetchProduct.fetchProductSuccess(res.data));
    } catch (error) {
        yield put(actions.fetchProduct.fetchProductFail(error.message));
    }
}

export default function* mySaga() {
    yield takeLatest(actions.fetchProduct.fetchProductRequest, fetchProduct);
}
