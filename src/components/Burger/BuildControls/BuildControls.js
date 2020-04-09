import React, { Fragment } from "react";

import classes from "../BuildControls/BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  // if sum of Ingredient quantities < 1, disable the 'Order' button below
  const sumOfIngredientQuantities = Object.values(props.ingredients).reduce((sum, currEl) => {
    return sum + currEl;
  },0);

  return (
    <Fragment>
      <p className={classes.price}>{"Total Price: " } &nbsp; ${props.totalPrice} </p>
      <div className={classes.BuildControls}>
        {controls.map((ingredient, idx) => (
          <BuildControl
            key={ingredient.label}
            label={ingredient.label}
            type={ingredient.type}
            select={props.select}
            quantity={props.ingredients[ingredient.type]}
          />
        ))}
        <button onClick={props.ordered} className={classes.OrderButton} disabled={!sumOfIngredientQuantities}>ORDER NOW</button>
      </div>
    </Fragment>
  );
};

export default BuildControls;
