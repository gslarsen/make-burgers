import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  error: false,
  errorMsg: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat({ id: action.orderId, orderData: action.orderData }),
        loading: false,
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.errorMsg,
      };
    default:
      return state;
  }
};

export default reducer;
