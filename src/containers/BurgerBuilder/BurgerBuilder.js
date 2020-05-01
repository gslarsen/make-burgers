import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../containers/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    if (!this.props.ingredients) this.props.onInitIngredients();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      this.props.err(true, this.props.errorMsg);
    }
  }

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
    let burger;

    if (this.props.error) {
      burger = (
        <p style={{ textAlign: "center" }}>Ingredients can't be loaded!</p>
      );
    } else burger = <Spinner />;

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
    error: state.error,
    errorMsg: state.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeIngredientHandler: (e, ingredient) =>
      dispatch(burgerBuilderActions.changeIngredient(e, ingredient)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder));
