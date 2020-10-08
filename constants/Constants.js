/*
 * Navigation Stack
 */
export const NAVIGATION_STACK = {
  HOME: { name: 'Home', title: 'RecipeApp React Native' },
  RECIPE_DETAIL: { name: 'RecipeDetails' },
  ADD_NEW_RECIPE: {
    name: 'AddNewRecipe',
    title: 'Add Recipe',
    title2: 'Edit Recipe',
  },
  RECIPE_LIST: { name: 'RecipeList', title: 'Recipe List' },
};

/*
 * Database
 */
export const DATABASE_RECIPE = 'Recipe';

/*
 * Reducers
 */
export const READ_XML_CATEGORIES = 'READ_XML_CATEGORIES'
export const API_GET_RECIPE = 'API_GET_RECIPE';
