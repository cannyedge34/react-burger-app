import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
  INIT_INGREDIENTS
} from './types';

export const addIngredient = name => {
  return {
    type: ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  // these actions are executed in burgerBuilder sagas
  // return dispatch => {
  //   const req = async () => {
  //     try {
  //       const res = await axios.get('/ingredients.json');
  //       dispatch(setIngredients(res.data));
  //     } catch (e) {
  //       dispatch(fetchIngredientsFailed());
  //     }
  //   };
  //   req();
  // };
  return {
    type: INIT_INGREDIENTS
  };
};
