import { combineReducers, createStore } from 'redux';

const initialState = {};

const recipeApiInitialState = {
  recipeApi: [],
  isLoading: true,
};

const rootReducer = combineReducers({
  recipeApiReducer: RecipeAPIReducer,
});

export const recipeStore = createStore(rootReducer);

function RecipeAPIReducer(state = recipeApiInitialState, action) {
  switch (action.type) {
    case 'API_GET_RECIPE':
      return {
        ...state,
        recipeApi: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
