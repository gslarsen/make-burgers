import * as actionTypes from "../actions/actionTypes";
// import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  tomato: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  errorMsg: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return {...state, ingredients: action.ingredients, error: false, errorMsg: null};
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      // this.props.err(true, action.errorMsg); // load error msg modal
      return {...state, error: true, errorMsg: action.errorMsg};
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
