import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED
} from '../actions/types';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngredient = (state, action) => {
  /*-------------------------------Refactorized/New/Mad approarch :s----------------------*/
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
  /*-------------------------------Refactorized/New/Mad approarch :s----------------------*/
};

const removeIngredient = (state, action) => {
  /*-------------------------------Refactorized/New/Mad approarch :s----------------------*/
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedSt);
  /*-------------------------------Refactorized/New/Mad approarch :s----------------------*/
};

const setIngredients = (state, action) => {
  /*-------------------------------Refactorized/New/Mad approarch :s----------------------*/
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    error: false,
    building: false
  });
  /*-------------------------------Refactorized/New/Mad approarch :s----------------------*/
};

const fetchIngredientsFailed = (state, action) => {
  /*-------------------------------Refactorized/New/Mad approarch :s----------------------*/
  return updateObject(state, { error: true });
  /*-------------------------------Refactorized/New/Mad approarch :s----------------------*/
};

const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return addIngredient(state, action);
    /*-------------------------------Usual approarch----------------------*/
    // return {
    //   // Spread original object with ...state
    //   ...state,

    //    // Make a new copy of original object with deepest attributes
    //   ingredients: {
    //      updatedIngredients
    //      // It receives the copy values (payload to the action)
    //      ...state.ingredients,
    //      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    //   },
    //   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    // };
    /*-------------------------------Usual approarch----------------------*/
    case REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    /*-------------------------------Usual approarch----------------------*/
    // return {
    //   // Spread original object with ...state
    //   ...state,
    //   // Make a new copy of original object with deepest attributes
    //   ingredients: {
    //     ...state.ingredients,
    //     // It receives the copy values (payload to the action)
    //     [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    //   },
    //   totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    // };
    /*-------------------------------Usual approarch----------------------*/
    case SET_INGREDIENTS:
      return setIngredients(state, action);
    /*-------------------------------Usual approarch----------------------*/
    // return {
    //   ...state,
    //   ingredients: {
    //     salad: action.ingredients.salad,
    //     bacon: action.ingredients.bacon,
    //     cheese: action.ingredients.cheese,
    //     meat: action.ingredients.meat
    //   },
    //   totalPrice: 4,
    //   error: false
    // };
    /*-------------------------------Usual approarch----------------------*/
    case FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    /*-------------------------------Usual approarch----------------------*/
    // return {
    //   ...state,
    //   error: true
    // };
    /*-------------------------------Usual approarch----------------------*/
    default:
      return state;
  }
};

export default ingredientReducer;
