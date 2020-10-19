import {
  RECIPE_STR_INGREDIENT,
  RECIPE_STR_MEASURE,
  SET_RECIPE_IMAGE,
  SET_RECIPE_NAME,
  SET_RECIPE_INSTRUCTION,
  ADD_RECIPE_INGREDIENT,
  REMOVE_RECIPE_INGREDIENT,
  ON_INGREDIENT_TEXT_CHANGE,
  SET_RECIPE_TO_EDIT,
  RESET_RECIPE_FORMS,
} from '../constants/Constants';
import { PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const initialState = {
  recipeImage: '',
  recipeName: '',
  recipeInstruction: '',
  recipeIngredients: [],
};

const imagePickerOptions = {
  title: 'Select Camera / Gallery',
  noData: true,
  storageOptions: {
    skipBackup: true,
    privateDirectory: true,
    path: 'images',
  },
};

/*
 * RecipeFormsReducer ACTIONS - START
 */
export const showImagePicker = async (dispatch) => {
  await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]).then((result) => {
    if (
      result['android.permission.CAMERA'] &&
      result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
    ) {
      ImagePicker.showImagePicker(imagePickerOptions, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = response.uri;
          dispatch({ type: SET_RECIPE_IMAGE, payload: source });
        }
      });
    }
  });
};

export const setRecipeName = (value, dispatch) => {
  dispatch({ type: SET_RECIPE_NAME, payload: value });
};

export const setRecipeInstruction = (value, dispatch) => {
  dispatch({ type: SET_RECIPE_INSTRUCTION, payload: value });
};

export const addIngredient = (dispatch) => {
  dispatch({ type: ADD_RECIPE_INGREDIENT });
};

export const removeIngredient = (index, dispatch) => {
  dispatch({ type: REMOVE_RECIPE_INGREDIENT, payload: index });
};

export const onIngredientTextChange = (index, target, value, dispatch) => {
  dispatch({
    type: ON_INGREDIENT_TEXT_CHANGE,
    payload: { index: index, target: target, value: value },
  });
};

export const setRecipeToEdit = (recipeToEdit, dispatch) => {
  dispatch({ type: SET_RECIPE_TO_EDIT, payload: recipeToEdit });
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
    case SET_RECIPE_INSTRUCTION:
      return {
        ...state,
        recipeInstruction: action.payload,
      };
    case ADD_RECIPE_INGREDIENT:
      const tempAddIngredients = [
        ...state.recipeIngredients,
        { ingredient: '', measure: '' },
      ];
      return {
        ...state,
        recipeIngredients: tempAddIngredients,
      };
    case REMOVE_RECIPE_INGREDIENT:
      const tempRemoveIngredients = [...state.recipeIngredients];
      tempRemoveIngredients.splice(action.payload, 1);
      return {
        ...state,
        recipeIngredients: tempRemoveIngredients,
      };
    case ON_INGREDIENT_TEXT_CHANGE:
      const tempOnTextChangeIngredients = [...state.recipeIngredients];
      tempOnTextChangeIngredients[action.payload.index][action.payload.target] =
        action.payload.value;
      return {
        ...state,
        recipeIngredients: tempOnTextChangeIngredients,
      };
    case SET_RECIPE_TO_EDIT:
      const tempIngredients = [];
      for (let p = 0; p < 20; p++) {
        if (
          action.payload[`${RECIPE_STR_INGREDIENT}${p + 1}`] !== null &&
          action.payload[`${RECIPE_STR_INGREDIENT}${p + 1}`] !== ''
        ) {
          tempIngredients.push({
            ingredient: action.payload[`${RECIPE_STR_INGREDIENT}${p + 1}`],
            measure: action.payload[`${RECIPE_STR_MEASURE}${p + 1}`],
          });
        }
      }
      return {
        ...state,
        recipeImage: action.payload.strMealThumb,
        recipeName: action.payload.strMeal,
        recipeInstruction: action.payload.strInstructions,
        recipeIngredients: tempIngredients,
      };
    case RESET_RECIPE_FORMS:
      return {
        ...state,
        recipeImage: '',
        recipeName: '',
        recipeInstruction: '',
        recipeIngredients: [],
      };
    default:
      return state;
  }
};
