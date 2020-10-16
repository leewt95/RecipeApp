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
export const RECIPE_ID = 'idMeal';
export const RECIPE_CATEGORY = 'strCategory';
export const RECIPE_STR_INGREDIENT = 'strIngredient';
export const RECIPE_STR_MEASURE = 'strMeasure';

/*
 * Reducers
 */
// RecipeCategoriesReducer
export const READ_XML_CATEGORIES = 'READ_XML_CATEGORIES';
export const UPDATE_SELECTED_CATEGORY = 'UPDATE_SELECTED_CATEGORY';
export const UPDATE_SELECTED_CATEGORY_WITHOUT_ALL =
  'UPDATE_SELECTED_CATEGORY_WITHOUT_ALL';
// RecipeAPIReducer
export const API_GET_RECIPE = 'API_GET_RECIPE';
// RecipeDatabaseReducer
export const DATABASE_GET_RECIPE = 'DATABASE_GET_RECIPE';
export const DATABASE_DELETE_RECIPE = 'DATABASE_DELETE_RECIPE';
// RecipeFormsReducer
export const SET_RECIPE_IMAGE = 'SET_RECIPE_IMAGE';
export const SET_RECIPE_NAME = 'SET_RECIPE_NAME';
export const SET_RECIPE_INSTRUCTION = 'SET_RECIPE_INSTRUCTION';
export const ADD_RECIPE_INGREDIENT = 'ADD_RECIPE_INGREDIENT';
export const REMOVE_RECIPE_INGREDIENT = 'REMOVE_RECIPE_INGREDIENT';
export const ON_INGREDIENT_TEXT_CHANGE = 'ON_INGREDIENT_TEXT_CHANGE';
export const TARGET_INGREDIENT = 'ingredient';
export const TARGET_MEASURE = 'measure';
export const SET_RECIPE_TO_EDIT = 'SET_RECIPE_TO_EDIT';
export const RESET_RECIPE_FORMS = 'RESET_RECIPE_FORMS';

/*
 * UI
 */
export const recipeFormExamples = {
  name: 'ex. Garlic Bread',
  instruction: `1. Preheat oven to 350°F\n2. Prepare the garlic bread\n3. Heat in oven for 10 min\n...`,
  ingredient: 'ex. Bread',
  measure: 'ex. 450g',
};
