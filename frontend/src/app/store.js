import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "~/redux/reducers";
import logger from "redux-logger";
import mySaga from "~/redux/saga";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware, logger),
});

sagaMiddleware.run(mySaga);
