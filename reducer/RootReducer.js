import { combineReducers, createStore } from 'redux';
import { RecipeAPIReducer } from './RecipeApiReducer';
import { RecipeCategoriesReducer } from './RecipeCategoriesReducer';

const rootReducer = combineReducers({
  recipeApiReducer: RecipeAPIReducer,
  recipeCategoriesReducer: RecipeCategoriesReducer
});

export const recipeStore = createStore(rootReducer);
