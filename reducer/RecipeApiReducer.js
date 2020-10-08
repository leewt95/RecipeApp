import { API_GET_RECIPE } from '../constants/Constants';

const initialState = {
  recipeApi: [],
};

export const RecipeAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_GET_RECIPE:
      return {
        ...state,
        recipeApi: action.payload,
      };
    default:
      return state;
  }
};
