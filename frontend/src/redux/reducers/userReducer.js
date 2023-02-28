import { getType } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { INITIAL_STATE } from "~/app/initialState";
import { cartItemKey, paymentMethodKey, shippingAddressKey, userKey } from "~/constants";
import { signIn, signOut, signUp } from "../actions";

export const userReducer = (state = INITIAL_STATE.user, action) => {
    switch (action.type) {
        case getType(signIn.signInRequest):
        case getType(signUp.signUpRequest):
            return {
                ...state,
                loading: true,
            };
        case getType(signIn.signInSuccess):
        case getType(signUp.signUpSuccess):
            toast.success(`${action.type === getType(signIn.signInSuccess) ? "Sign in" : "Sign up"} successfully`);
            localStorage.setItem(userKey, JSON.stringify(action.payload));
            return {
                ...state,
                userInfo: action.payload,
                loading: false,
                error: undefined,
            };
        case getType(signIn.signInFail):
        case getType(signUp.signUpFail):
            toast.error(action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case getType(signOut):
            localStorage.removeItem(userKey);
            localStorage.removeItem(cartItemKey);
            localStorage.removeItem(shippingAddressKey);
            localStorage.removeItem(paymentMethodKey);
            return {
                ...state,
                userInfo: undefined,
            };
        default:
            return state;
    }
};
