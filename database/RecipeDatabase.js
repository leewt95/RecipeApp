import Realm from 'realm';
import { RecipeSchema } from './RecipeSchema';
import {
  DATABASE_RECIPE,
  RECIPE_STR_INGREDIENT,
  RECIPE_STR_MEASURE,
} from '../constants/Constants';
import UUID from 'react-native-uuid';

export const viewDatabase = async () => {
  await Realm.open({
    schema: [RecipeSchema],
  })
    .then((realm) => {
      {
        for (let p of realm.objects(DATABASE_RECIPE)) {
          console.log(p);
        }
      }
      realm.close();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const clearDatabase = async () => {
  await Realm.open({
    schema: [RecipeSchema],
  })
    .then((realm) => {
      realm.write(() => {
        realm.delete(realm.objects(DATABASE_RECIPE));
      });
      realm.close();
      console.log('Database cleared!');
    })
    .catch((e) => {
      console.log(e);
    });
};

export const addRecipeToDb = async (
  navigation,
  recipeName,
  selectedCategory,
  recipeInstruction,
  recipeImage,
  recipeIngredients,
  editRecipe = false,
  recipeToEdit = [],
) => {
  await Realm.open({
    schema: [RecipeSchema],
  })
    .then((realm) => {
      realm.write(() => {
        let recipeDb = realm.create(
          DATABASE_RECIPE,
          {
            idMeal: editRecipe ? recipeToEdit.idMeal : UUID.v4(),
            strMeal: recipeName,
            strCategory: selectedCategory,
            strInstructions: recipeInstruction,
            strMealThumb: recipeImage,
          },
          true,
        );

        const tempIngredients = [];
        for (let p = 0; p < 20; p++) {
          tempIngredients.push({ ingredient: '', measure: '' });
        }
        for (let p = 0; p < recipeIngredients.length; p++) {
          tempIngredients[p].ingredient = recipeIngredients[p].ingredient;
          tempIngredients[p].measure = recipeIngredients[p].measure;
        }
        for (let p = 0; p < tempIngredients.length; p++) {
          recipeDb[`${RECIPE_STR_INGREDIENT}${p + 1}`] =
            tempIngredients[p].ingredient;
          recipeDb[`${RECIPE_STR_MEASURE}${p + 1}`] =
            tempIngredients[p].measure;
        }
      });
      {
        for (let p of realm.objects(DATABASE_RECIPE)) {
          console.log(p);
        }
      }
      realm.close();
      navigation.goBack();
    })
    .catch((e) => {
      console.log(e);
    });
};
