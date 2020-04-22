import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
  };

  checkoutCancelledHandler = () => {
    const ingredientNameValues = Object.entries(this.state.ingredients || []);
    let queryString = "?";
    ingredientNameValues.forEach((item, idx) => {
      if (idx === ingredientNameValues.length - 1)
        queryString += item[0] + "=" + item[1];
      else queryString += item[0] + "=" + item[1] + "&";
    });

    this.props.history.push({
      pathname: "/",
      search: queryString,
    }, this.state.totalPrice);
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentDidMount() {
    if (this.props.location.state) {
      const ingredients = this.props.location.state.ingredients || {};
      const totalPrice =
        parseFloat(this.props.location.state.totalPrice, 10) || 0;

      this.setState({
        ingredients,
        totalPrice,
      });
    }
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>}
        />
      </div>
    );
  }
}

export default Checkout;
