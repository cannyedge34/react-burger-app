import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/types';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        /*Spread original object with ...state */
        ...state,
        /*Make a new copy of original object with deepest attributes*/
        ingredients: {
          ...state.ingredients,
          /* It receives the copy values (payload to the action) */
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case REMOVE_INGREDIENT:
      return {
        /*Spread original object with ...state */
        ...state,
        /*Make a new copy of original object with deepest attributes*/
        ingredients: {
          ...state.ingredients,
          /* It receives the copy values (payload to the action) */
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    default:
      return state;
  }
};

export default ingredientReducer;
