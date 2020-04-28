import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../containers/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  // componentDidMount() {
    // if (this.props.location.search && this.props.location.state) {
    //   const ingredients = this.props.location.search
    //     .substr(1)
    //     .split("&")
    //     .map((item) => item.split("="))
    //     .reduce((acc, item) => {
    //       acc[item[0]] = parseInt(item[1], 0);
    //       return acc;
    //     }, {});
    //   this.setState({ ingredients, totalPrice: parseFloat(this.props.location.state) });
    //   return;
    // }
    // axios
    //   .get("/ingredients.json ")
    //   .then((res) => {
    //     let firebaseIngredients = res.data;
    //     const ingredients = {};
    //     // remove firebase ingredient ordering number (e.g. 1lettuce) from front of ingredient for state (firebase default order is alphabetical)
    //     for (let key in firebaseIngredients) {
    //       let revisedKey = key.substr(1);
    //       ingredients[revisedKey] = firebaseIngredients[key];
    //     }
    //     this.setState({ ingredients });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //     this.props.err(true, error.message);
    //   });
  // }

  // changeIngredientHandler = (e, type) => {
  //   const changeValue = e.target.innerText;
  //   const ingredient = type;

  //   this.setState((prevState) => {
  //     const ingredients = { ...prevState.ingredients };
  //     let totalPrice = prevState.totalPrice;

  //     switch (changeValue) {
  //       case "Less":
  //         if (ingredients[ingredient] >= 1) {
  //           ingredients[ingredient] = ingredients[ingredient] - 1;
  //           totalPrice -= INGREDIENT_PRICES[ingredient];
  //         }
  //         break;
  //       case "More":
  //         ingredients[ingredient] = ingredients[ingredient] + 1;
  //         totalPrice += INGREDIENT_PRICES[ingredient];
  //         break;
  //       default:
  //         break;
  //     }

  //     return { ingredients, totalPrice };
  //   });
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = (btnType) => {
    // go to /checkout and pass props: ingredients and totalPrice
    this.props.history.push("/checkout", {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
    });
  };

  render() {
    let orderSummary = null;
    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ordered={this.purchaseHandler}
            ingredients={this.props.ingredients}
            select={this.props.changeIngredientHandler}
            totalPrice={this.props.totalPrice.toFixed(2)}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeIngredientHandler: (e, ingredient) => {
      let type = e.target.innerText === 'Less' ? actionTypes.REMOVE_INGREDIENT : actionTypes.ADD_INGREDIENT;
      dispatch({ type, ingredient });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder));
