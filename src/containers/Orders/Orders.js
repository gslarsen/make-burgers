import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    let token = localStorage.getItem('token');
    if (this.props.token) token = this.props.token;

    if (token) this.props.fetchOrders(token);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      if(this.props.error) this.props.err(true, this.props.errorMsg);
    }
  }

  render() {
    let orders;

    if (this.props.loading) orders = <Spinner />;
    else if (this.props.error) {
      if (this.props.errorMsg.includes("401"))
        orders = (
          <h4 style={{ textAlign: "center" }}>
            Please login to get your orders.
          </h4>
        );
      else
        orders = (
          <h4 style={{ textAlign: "center" }}>
            Apologies! There was a problem fetching the orders.
          </h4>
        );
    } else if (this.props.orders.length > 0) {
      orders = this.props.orders.map((order, idx) => {
        return (
          <Order
            key={order.orderId}
            orderId={order.orderId}
            ingredients={order.ingredients}
            totalPrice={order.totalPrice}
          />
        );
      });
    } else
      orders = (
        <h4 style={{ textAlign: "center" }}>There aren't any orders yet!</h4>
      );
    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    errorMsg: state.order.errorMsg,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token) => dispatch(actions.fetchOrders(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders));
