import React, { Component, Fragment } from "react";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    // debugger;
    const inAuthPath = this.props.history.location.pathname === "/auth";
    let sumOfIngredients = 0;
    let redirectPath = "/";

    if (inAuthPath && this.props.ingredients) {
      sumOfIngredients = Object.values(this.props.ingredients).reduce(
        (acc, ingredientQty) => {
          return acc + ingredientQty;
        },
        0
      );
      if (sumOfIngredients > 0) redirectPath = "/checkout";
    }

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated)
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to={redirectPath}  />
        </Switch>
      );

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    ingredients: state.burgerBuilder.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
