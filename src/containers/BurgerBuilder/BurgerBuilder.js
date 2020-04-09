import React, { Component, Fragment } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasing: false,
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
    alert("You Continue!");
  };

  render() {
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
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
