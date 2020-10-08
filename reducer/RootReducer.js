import { combineReducers, createStore } from 'redux';
import { RecipeAPIReducer } from './RecipeApiReducer';
import { RecipeCategoriesReducer } from './RecipeCategoriesReducer';
import { RecipeDatabaseReducer } from './RecipeDatabaseReducer';

const rootReducer = combineReducers({
  recipeApiReducer: RecipeAPIReducer,
  recipeCategoriesReducer: RecipeCategoriesReducer,
  recipeDatabaseReducer: RecipeDatabaseReducer
});

export const recipeStore = createStore(rootReducer);
