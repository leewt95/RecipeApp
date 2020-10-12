import {
  SET_RECIPE_IMAGE,
  SET_RECIPE_NAME,
  SET_RECIPE_CATEGORY,
  SET_RECIPE_INSTRUCTION,
  ADD_RECIPE_INGREDIENT,
  REMOVE_RECIPE_INGREDIENT,
  ON_INGREDIENT_TEXT_CHANGE,
  RESET_RECIPE_FORMS,
} from '../constants/Constants';

const initialState = {
  recipeImage: '',
  recipeName: '',
  recipeCategory: '',
  recipeInstruction: '',
  recipeIngredients: [],
};

/*
 * RecipeFormsReducer ACTIONS - START
 */
export const showImagePicker = (value, dispatch) => {
  dispatch({ type: SET_RECIPE_IMAGE, payload: value });
};

export const setRecipeName = (value, dispatch) => {
  dispatch({ type: SET_RECIPE_NAME, payload: value });
};

export const setRecipeCategory = (value, dispatch) => {
  dispatch({ type: SET_RECIPE_CATEGORY, payload: value });
};

export const setRecipeInstruction = (value, dispatch) => {
  dispatch({ type: SET_RECIPE_INSTRUCTION, payload: value });
};

export const addIngredient = (dispatch) => {
  const tempIngredients = [
    ...recipeIngredients,
    { ingredient: '', measure: '' },
  ];
  dispatch({ type: ADD_RECIPE_INGREDIENT, payload: tempIngredients });
};

export const removeIngredient = (index, dispatch) => {
  const tempIngredients = [...recipeIngredients];
  tempIngredients.splice(index, 1);
  dispatch({ type: REMOVE_RECIPE_INGREDIENT, payload: tempIngredients });
};

export const onIngredientTextChange = (index, target, value, dispatch) => {
  const tempIngredients = [...recipeIngredients];
  tempIngredients[index][target] = value;
  dispatch({ type: ON_INGREDIENT_TEXT_CHANGE, payload: tempIngredients });
};

export const resetRecipeForms = (dispatch) => {
  dispatch({ type: RESET_RECIPE_FORMS });
};
/*
 * RecipeFormsReducer ACTIONS - END
 */

export const RecipeFormsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPE_IMAGE:
      return {
        ...state,
        recipeImage: action.payload,
      };
    case SET_RECIPE_NAME:
      return {
        ...state,
        recipeName: action.payload,
      };
    case SET_RECIPE_CATEGORY:
      return {
        ...state,
        recipeCategory: action.payload,
      };
    case SET_RECIPE_INSTRUCTION:
      return {
        ...state,
        recipeInstruction: action.payload,
      };
    case ADD_RECIPE_INGREDIENT:
      return {
        ...state,
        recipeIngredients: action.payload,
      };
    case REMOVE_RECIPE_INGREDIENT:
      return {
        ...state,
        recipeIngredients: action.payload,
      };
    case ON_INGREDIENT_TEXT_CHANGE:
      return {
        ...state,
        recipeIngredients: action.payload,
      };
    case RESET_RECIPE_FORMS:
      return {
        ...state,
        recipeImage: '',
        recipeName: '',
        recipeCategory: '',
        recipeInstruction: '',
        recipeIngredients: [],
      };
    default:
      return state;
  }
};
