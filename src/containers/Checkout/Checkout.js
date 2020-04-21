import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {},
  };

  checkoutCancelledHandler = () => {
    const ingredientNameValues = Object.entries(this.state.ingredients);
    let queryString = "?";
    ingredientNameValues.forEach((item, idx) => {
      if (idx === ingredientNameValues.length-1) queryString += item[0] + "=" + item[1];
      else queryString += item[0] + "=" + item[1] + "&";
    });

    this.props.history.push({
      pathname: "/",
      search: queryString,
    });
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentDidMount() {
    this.setState({ ingredients: this.props.location.state });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;
