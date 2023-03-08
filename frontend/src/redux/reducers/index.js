import { combineReducers } from "@reduxjs/toolkit";

import { cartReducer } from "./cartReducer";
import { orderReducer } from "./orderReducer";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
    productState: productReducer,
    cartState: cartReducer,
    userState: userReducer,
    orderState: orderReducer,
});
