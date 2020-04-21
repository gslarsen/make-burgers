import React, { Component, Fragment } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../containers/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  tomato: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    if(this.props.location.search) {
    const ingredients = this.props.location.search
      .substr(1)
      .split("&")
      .map((item) => item.split("="))
      .reduce((acc, item) => {
        acc[item[0]] = parseInt(item[1],0);
        return acc;
      }, {});
      this.setState({ingredients});
      return;
    }

    axios
      .get("/ingredients.json ")
      .then((res) => {
        let firebaseIngredients = res.data;
        const ingredients = {};

        // remove firebase ingredient ordering number (e.g. 1lettuce) from front of ingredient for state (firebase default order is alphabetical)
        for (let key in firebaseIngredients) {
          let revisedKey = key.substr(1);
          ingredients[revisedKey] = firebaseIngredients[key];
        }

        this.setState({ ingredients });
      })
      .catch((error) => {
        this.setState({ error: true });
        this.props.err(true, error.message);
      });
  }

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
    this.props.history.push("/checkout", this.state.ingredients);

    // this.setState({ loading: true });
    // // firebase endpoint, so use .json extension
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Greg Larsen",
    //     address: {
    //       street: "123 Somewhere St.",
    //       city: "Durham",
    //       state: "NC",
    //       zip: "12345",
    //       country: "United States",
    //     },
    //     email: "test@test.com",
    //   },
    //   deliveryMethod: "fedex ground",
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((error) => {
    //     this.setState({ loading: false, purchasing: false });
    //     this.props.err(true, error.message);
    //   });
  };

  render() {
    let orderSummary = null;
    let burger = this.state.error ? (
      <p style={{ textAlign: "center" }}>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ordered={this.purchaseHandler}
            ingredients={this.state.ingredients}
            select={this.changeIngredientHandler}
            totalPrice={this.state.totalPrice.toFixed(2)}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder);
