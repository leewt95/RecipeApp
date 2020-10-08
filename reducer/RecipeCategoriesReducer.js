import { READ_XML_CATEGORIES, UPDATE_SELECTED_CATEGORY } from '../constants/Constants';
import RecipeCategories from '../xml/RecipeCategories';

const initialState = {
  recipeCategories: [],
  firstCategoryValue: '',
  selectedCategory: '',
};

export const readRecipeCategories = async (dispatch) => {
  var strXml = require('react-native-xml2js').parseString;
  var xml = RecipeCategories;
  try {
    await strXml(xml, (err, result) => {
      dispatch({
        type: READ_XML_CATEGORIES,
        payload: result.RecipeCategories.Category,
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateSelectedCategory = (value, dispatch) => {
  dispatch({type: UPDATE_SELECTED_CATEGORY, payload: value})
}

export const RecipeCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_XML_CATEGORIES:
      return {
        ...state,
        recipeCategories: action.payload,
        firstCategoryValue: action.payload[0],
        selectedCategory: action.payload[0]
      };
    case UPDATE_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    default:
      return state;
  }
};
