import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const changeIngredient = (e, ingredient) => {
  let type =
    e.target.innerText === "Less"
      ? actionTypes.REMOVE_INGREDIENT
      : actionTypes.ADD_INGREDIENT;
  return { type, ingredient };
};

export const clearIngredients = () => {
  return {
    type: actionTypes.CLEAR_INGREDIENTS,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = (errorMsg) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    errorMsg,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((res) => {
        let firebaseIngredients = res.data;
        const ingredients = {};
        // remove firebase ingredient ordering number (e.g. 1lettuce) from front of ingredient for state (firebase default order is alphabetical)
        for (let key in firebaseIngredients) {
          let revisedKey = key.substr(1);
          ingredients[revisedKey] = firebaseIngredients[key];
        }
        dispatch(setIngredients(ingredients));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed(error.message));
      });
  };
};
