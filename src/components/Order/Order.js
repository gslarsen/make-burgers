import React from "react";

import classes from "./Order.module.css";

const Order = (props) => {
  let ingredients = Object.entries(props.ingredients).map((ingredient) => {
    if (parseInt(ingredient[1], 10) === 0) return null;

    return (
      <span key={ingredient[0] + ':' + ingredient[1]} className={classes.ingredients}>
        {ingredient[0] + ' (' + ingredient[1] + ') '}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Order Id: {props.orderId}</p>
      <span className={classes.ingredientsSpan}>Ingredients: {ingredients}</span>
      <p>
        Price: &nbsp;{" "}
        <strong>{`$ ${parseFloat(props.totalPrice).toFixed(2)}`}</strong>
      </p>
    </div>
  );
};

export default Order;
