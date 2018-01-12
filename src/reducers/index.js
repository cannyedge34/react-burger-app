import { combineReducers } from 'redux';
import ingredientReducer from './ingredientReducer';

export default combineReducers({
  ingredient: ingredientReducer
});
