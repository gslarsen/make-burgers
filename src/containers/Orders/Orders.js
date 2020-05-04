import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let orders;

    if (this.props.loading) orders = <Spinner />;
    else if (this.props.error) {
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
    } else orders = (
      <h4 style={{ textAlign: "center" }}>
        There aren't any orders yet!
      </h4>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders));
