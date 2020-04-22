import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';

class Orders extends Component {

  state = {
    orders: {},
    error: null,
    loading: true
  }

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const orders = res.data;
        this.setState({ orders, loading: false });
      })
      .catch((error) => {
        this.setState({ error: true, loading: false});
        this.props.err(true, error.message);
      });
  }

  render() {
    let orders;

    if (this.state.loading) orders = <Spinner />;
    else orders = Object.entries(this.state.orders).map((order, idx) => {
      return <Order key={order[0]} orderId={order[0]} ingredients={order[1].ingredients} totalPrice={order[1].totalPrice}/>
    });
    
    return this.state.error ? <h4 style={{textAlign: 'center'}}>Sorry, there was an error getting orders.</h4> : <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders);
