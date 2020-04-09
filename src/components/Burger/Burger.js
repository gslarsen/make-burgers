import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const Burger = (props) => {
  let ingredients = null; 

  const ingredientSum = Object.values(props.ingredients).reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  if (ingredientSum) {
    ingredients = Object.keys(props.ingredients).map((ingredientKey) => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return (
          <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        );
      });
    });
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients || <p>Please add some ingredients!</p>}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
