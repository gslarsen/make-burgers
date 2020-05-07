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
      .post("/orders.json?auth=" + props.token, orderData)
      .then((response) => {
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

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());

    axios
      .get("/orders.json?auth=" + token)
      .then((res) => {
        let orders = res.data;
        if (!orders) dispatch(fetchOrdersSuccess([]));
        else {
          orders = Object.entries(orders)
            .map((order, idx) => {
              return order;
            })
            .map((order) => {
              return { ...order[1], orderId: order[0] };
            });
          dispatch(fetchOrdersSuccess(orders));
        }
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
