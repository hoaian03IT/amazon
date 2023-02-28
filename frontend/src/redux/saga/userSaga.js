import { call, put } from "redux-saga/effects";
import * as api from "~/app/api";
import * as actions from "~/redux/actions";
import { getError } from "~/utils/getError";

function* signInSaga(action) {
    try {
        const res = yield call(api.signInAPI, action.payload);
        yield put(actions.signIn.signInSuccess(res.data));
    } catch (error) {
        yield put(actions.signIn.signInFail(getError(error)));
    }
}

function* signUpSaga(action) {
    try {
        const res = yield call(api.signUpAPI, action.payload);
        yield put(actions.signUp.signUpSuccess(res.data));
    } catch (error) {
        yield put(actions.signUp.signUpFail(getError(error)));
    }
}

export { signInSaga, signUpSaga };
