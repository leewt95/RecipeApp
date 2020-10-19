import Realm from 'realm';
import { RecipeSchema } from '../database/RecipeSchema';
import {
  DATABASE_RECIPE,
  DATABASE_GET_RECIPE,
  DATABASE_DELETE_RECIPE,
  RECIPE_ID,
  RECIPE_CATEGORY,
} from '../constants/Constants';

const initialState = {
  recipeList: [],
};

export const loadRecipeFromDatabase = async (dispatch) => {
  await Realm.open({
    schema: [RecipeSchema],
  })
    .then((realm) => {
      var recipeArray = [];
      if (realm.objects(DATABASE_RECIPE).length > 0) {
        for (let p of realm.objects(DATABASE_RECIPE)) {
          recipeArray.push(JSON.parse(JSON.stringify(p)));
        }
      }
      dispatch({ type: DATABASE_GET_RECIPE, payload: recipeArray });
      realm.close();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const filterRecipe = async (filterQuery, dispatch) => {
  await Realm.open({
    schema: [RecipeSchema],
  }).then((realm) => {
    var recipeArray = [];
    let recipeQuery = realm
      .objects(DATABASE_RECIPE)
      .filtered(`${RECIPE_CATEGORY} = "${filterQuery}"`);
    if (recipeQuery.length > 0) {
      for (let p of recipeQuery) {
        recipeArray.push(JSON.parse(JSON.stringify(p)));
      }
    }
    dispatch({ type: DATABASE_GET_RECIPE, payload: recipeArray });
    realm.close();
  });
};

export const deleteRecipe = async (idMeal, index, dispatch) => {
  await Realm.open({
    schema: [RecipeSchema],
  }).then((realm) => {
    let deleteRecipe = realm
      .objects(DATABASE_RECIPE)
      .filtered(`${RECIPE_ID} = "${idMeal}"`);
    realm.write(() => {
      realm.delete(deleteRecipe);
      console.log(`DELETED ${idMeal}`);
    });
    realm.close();
  });
  dispatch({ type: DATABASE_DELETE_RECIPE, payload: index });
};

export const RecipeDatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATABASE_GET_RECIPE:
      return {
        ...state,
        recipeList: action.payload,
      };
    case DATABASE_DELETE_RECIPE:
      const recipeListCopy = [...state.recipeList];
      recipeListCopy.splice(action.payload, 1);
      return {
        ...state,
        recipeList: recipeListCopy,
      };
    default:
      return state;
  }
};
