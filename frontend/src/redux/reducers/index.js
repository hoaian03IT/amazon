import { combineReducers } from "@reduxjs/toolkit";

import { cartReducer } from "./cartReducer";
import { productReducer } from "./productReducer";

export default combineReducers({ productState: productReducer, cartState: cartReducer });
