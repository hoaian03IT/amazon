import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "~/redux/reducers";
import logger from "redux-logger";
import mySaga from "~/redux/saga";

export const INIT_STATE = {
    product: {
        products: [],
        loading: true,
        error: "",
    },
};

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(sagaMiddleware, logger),
});

sagaMiddleware.run(mySaga);
