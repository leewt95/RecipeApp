import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { Button, Icon, Toast } from 'native-base';
import AddEditRecipe from '../components/AddRecipeScreen/AddEditRecipe';
import { NAVIGATION_STACK } from '../constants/Constants';
import { addEditRecipeToDbForms } from '../database/RecipeDatabase';
import { updateSelectedCategoryWithoutAll } from '../reducer/RecipeCategoriesReducer';
import {
  setRecipeToEdit,
  resetRecipeForms,
} from '../reducer/RecipeFormsReducer';
import { useDispatch, useSelector } from 'react-redux';

const AddRecipeScreen = ({ navigation, route }) => {
  const { recipeToEdit, editRecipe } = route.params;
  const [saved, savedToDb] = useState(false);
  const {
    firstCategoryValueWithoutAll,
    selectedCategoryWithoutAll,
  } = useSelector(({ recipeCategoriesReducer }) => recipeCategoriesReducer);
  const {
    recipeImage,
    recipeName,
    recipeInstruction,
    recipeIngredients,
  } = useSelector(({ recipeFormsReducer }) => recipeFormsReducer);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editRecipe
        ? NAVIGATION_STACK.ADD_NEW_RECIPE.title2
        : NAVIGATION_STACK.ADD_NEW_RECIPE.title,
      headerRight: () => (
        <Button
          rounded
          androidRippleColor="gray"
          style={{
            marginEnd: 3,
            elevation: 0,
            backgroundColor: 'transparent',
          }}
          onPress={() => {
            if (!saved) {
              savedToDb(true);
            }
          }}>
          <Icon
            type="FontAwesome5"
            name="save"
            style={saved ? { color: 'lightgray' } : { color: 'black' }}
          />
        </Button>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!editRecipe) {
      updateSelectedCategoryWithoutAll(firstCategoryValueWithoutAll, dispatch);
      resetRecipeForms(dispatch);
    } else {
      updateSelectedCategoryWithoutAll(recipeToEdit.strCategory, dispatch);
      setRecipeToEdit(recipeToEdit, dispatch);
    }
  }, []);

  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      addEditRecipeToDbForms(
        navigation,
        recipeName,
        selectedCategoryWithoutAll,
        recipeInstruction,
        recipeImage,
        recipeIngredients,
        editRecipe,
        recipeToEdit,
      );
      Toast.show({
        text: editRecipe
          ? `Edited ${recipeName} successfully!`
          : `Added ${recipeName} successfully`,
        buttonText: 'Okay',
        duration: 3000,
      });
    } else {
      didMountRef.current = true;
    }
  }, [saved]);

  return <AddEditRecipe />;
};

export default AddRecipeScreen;
