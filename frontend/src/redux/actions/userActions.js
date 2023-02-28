import { createAction, createActions } from "redux-actions";

export const signUp = createActions({
    signUpRequest: (payload) => payload,
    signUpSuccess: (payload) => payload,
    signUpFail: (err) => err,
});

export const signIn = createActions({
    signInRequest: (payload) => payload,
    signInSuccess: (payload) => payload,
    signInFail: (err) => err,
});

export const signOut = createAction("signOut");
