import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSoH4PDqv6PfEe76_TNXxbhUsoVsJ4dfA";

    if (!isSignup) url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSoH4PDqv6PfEe76_TNXxbhUsoVsJ4dfA";

    axios
      .post(url, authData)
      .then((response) => {
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
        console.log("ERROR:", err.response.data.error);
        dispatch(authFail(err.response.data.error));
      });
  };
};
