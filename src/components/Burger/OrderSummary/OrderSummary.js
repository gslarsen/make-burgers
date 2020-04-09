import React, { Fragment } from "react";

import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredients = Object.entries(props.ingredients).filter(
    (ingredient) => ingredient[1]
  );

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul style={{ listStyleType: "none" }}>
        {ingredients.map((ingredient) => (
          <li key={ingredient[0]}>
            <span style={{ textTransform: "capitalize" }}>{ingredient[0]}</span>
            : {ingredient[1]}
          </li>
        ))}
      </ul>
      <h3>Total: &nbsp; ${props.totalPrice.toFixed(2)}</h3>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Fragment>
  );
};

export default OrderSummary;
