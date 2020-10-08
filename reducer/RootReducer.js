import { combineReducers, createStore } from 'redux';
import { RecipeAPIReducer } from './RecipeApiReducer';

const rootReducer = combineReducers({
  recipeApiReducer: RecipeAPIReducer,
});

export const recipeStore = createStore(rootReducer);
