import { call, put } from "redux-saga/effects";
import * as api from "~/app/api";
import * as actions from "~/redux/actions";
import { getError } from "~/utils/getError";

function* fetchProductsSaga() {
    try {
        const res = yield call(api.fetchProductsAPI);
        yield put(actions.fetchProducts.fetchProductsSuccess(res.data));
    } catch (error) {
        yield put(actions.fetchProducts.fetchProductsFail(getError(error)));
    }
}

function* fetchInfoProductSaga(action) {
    try {
        const res = yield call(api.fetchInfoProductBySlugAPI, action.payload);
        yield put(actions.fetchInfoProduct.fetchInfoProductSuccess(res.data));
    } catch (error) {
        yield put(actions.fetchInfoProduct.fetchInfoProductFail(getError(error)));
    }
}

function* fetchFilteredProductSaga(action) {
    try {
        const res = yield call(api.fetchFilteredProductAPI, action.payload);
        yield put(actions.fetchFilteredProduct.fetchFilteredProductSuccess(res.data));
    } catch (error) {
        yield put(actions.fetchFilteredProduct.fetchFilteredProductFail(getError(error)));
    }
}

function* fetchCategoriesSaga() {
    try {
        const res = yield call(api.fetchCategoriesAPI);
        yield put(actions.fetchCategories.fetchCategoriesSuccess(res.data));
    } catch (error) {
        yield put(actions.fetchCategories.fetchCategoriesFail(getError(error)));
    }
}

export { fetchProductsSaga, fetchInfoProductSaga, fetchFilteredProductSaga, fetchCategoriesSaga };
