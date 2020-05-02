import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData,
  };
};

export const clearOrder = () => {
  return {
    type: actionTypes.CLEAR_INGREDIENTS,
  };
};

export const purchaseBurgerFail = (errorMsg) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    errorMsg,
  };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurger = (orderData, props) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log('RESPONSE data.name: ', response.data.name);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        dispatch(clearOrder());
        props.history.push("/", {});
        // this.setState({ loading: false });
        // this.props.removeIngredients();
        // this.props.history.push("/", {});
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error.message));
        // this.setState({ loading: false });
        // this.props.err(true, error.message);
      });
  };
};


