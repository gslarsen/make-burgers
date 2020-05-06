import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        token: action.authData.idToken,
        userId: action.authData.localId
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error.message,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;