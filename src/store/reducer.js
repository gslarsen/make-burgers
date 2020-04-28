import * as actionTypes from "./actions";

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  tomato: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: { lettuce: 0, tomato: 0, bacon: 0, cheese: 0, meat: 0 },
  totalPrice: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
      };
    case actionTypes.CLEAR_INGREDIENTS:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
