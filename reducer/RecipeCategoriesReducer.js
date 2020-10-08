import { READ_XML_CATEGORIES } from '../constants/Constants';
import RecipeCategories from '../xml/RecipeCategories'

const initialState = {
  recipeCategories: [],
  firstCategoryValue: '',
};

export const readRecipeCategories = (dispatch) => {
  var strXml = require('react-native-xml2js').parseString;
  var xml = RecipeCategories;
  try {
    strXml(xml, (err, result) => {
      dispatch({
        type: READ_XML_CATEGORIES,
        payload: result.RecipeCategories.Category,
      });
    });
  } catch (e) {
    console.log(e);
  }
};

export const RecipeCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_XML_CATEGORIES:
      return {
        ...state,
        recipeCategories: action.payload,
        firstCategoryValue: action.payload[0],
      };
    default:
      return state;
  }
};
