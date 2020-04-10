import React, { Fragment, Component } from "react";

import Button from "../../UI/Button/Button";

class OrderSummary extends Component {

  render = () => {
    const ingredients = Object.entries(this.props.ingredients).filter(
      (ingredient) => ingredient[1]
    );

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul style={{ listStyleType: "none" }}>
          {ingredients.map((ingredient) => (
            <li key={ingredient[0]}>
              <span style={{ textTransform: "capitalize" }}>
                {ingredient[0]}
              </span>
              : {ingredient[1]}
            </li>
          ))}
        </ul>
        <h3>Total: &nbsp; ${this.props.totalPrice.toFixed(2)}</h3>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Fragment>
    );
  };
}

export default OrderSummary;
