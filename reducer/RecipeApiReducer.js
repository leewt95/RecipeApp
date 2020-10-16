import TheMealDb from '../api/TheMealDb';
import { API_GET_RECIPE } from '../constants/Constants';

const initialState = {
  recipeApi: [],
  isLoading: true,
};

export const getRecipeOfTheDay = async (dispatch) => {
  await TheMealDb.get('/random.php')
    .then((response) => {
      dispatch({ type: API_GET_RECIPE, payload: response.data.meals[0] });
    })
    .catch((e) => {
      alert(e);
    });
};

export const RecipeAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_GET_RECIPE:
      return {
        ...state,
        recipeApi: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
