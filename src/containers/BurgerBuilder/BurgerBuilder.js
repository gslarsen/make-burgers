import React, { Component, Fragment } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  tomato: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 0,
      tomato: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasing: false,
    loading: false,
  };

  changeIngredientHandler = (e, type) => {
    const changeValue = e.target.innerText;
    const ingredient = type;

    this.setState((prevState) => {
      const ingredients = { ...prevState.ingredients };
      let totalPrice = prevState.totalPrice;

      switch (changeValue) {
        case "Less":
          if (ingredients[ingredient] >= 1) {
            ingredients[ingredient] = ingredients[ingredient] - 1;
            totalPrice -= INGREDIENT_PRICES[ingredient];
          }
          break;
        case "More":
          ingredients[ingredient] = ingredients[ingredient] + 1;
          totalPrice += INGREDIENT_PRICES[ingredient];
          break;
        default:
          break;
      }

      return { ingredients, totalPrice };
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = (btnType) => {
    this.setState({ loading: true });

    // firebase endpoint, so use .json extension
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Greg Larsen",
        address: {
          street: "123 Somewhere St.",
          city: "Durham",
          state: "NC",
          zip: "12345",
          country: "United States",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fedex ground",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => this.setState({ loading: false, purchasing: false }));
  };

  render() {
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ordered={this.purchaseHandler}
          ingredients={this.state.ingredients}
          select={this.changeIngredientHandler}
          totalPrice={this.state.totalPrice.toFixed(2)}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
