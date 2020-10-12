import { combineReducers, createStore } from 'redux';
import { RecipeAPIReducer } from './RecipeApiReducer';
import { RecipeCategoriesReducer } from './RecipeCategoriesReducer';
import { RecipeDatabaseReducer } from './RecipeDatabaseReducer';
import { RecipeFormsReducer } from './RecipeFormsReducer';

const rootReducer = combineReducers({
  recipeApiReducer: RecipeAPIReducer,
  recipeCategoriesReducer: RecipeCategoriesReducer,
  recipeDatabaseReducer: RecipeDatabaseReducer,
  recipeFormsReducer: RecipeFormsReducer,
});

export const recipeStore = createStore(rootReducer);
