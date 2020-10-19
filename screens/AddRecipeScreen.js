import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Button, Icon, Toast } from 'native-base';
import AddEditRecipe from '../components/AddRecipeScreen/AddEditRecipe';
import { addEditRecipeToDbForms } from '../database/RecipeDatabase';
import { updateSelectedCategoryWithoutAll } from '../reducer/RecipeCategoriesReducer';
import {
  setRecipeToEdit,
  resetRecipeForms,
} from '../reducer/RecipeFormsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NAVIGATION_STACK } from '../constants/Constants';
import { CLR_SECONDARY } from '../constants/Colors';

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
          style={styles.headerBtn}
          onPress={() => {
            if (!saved) {
              savedToDb(true);
            }
          }}>
          <Icon
            type="FontAwesome5"
            name="save"
            style={
              saved
                ? { color: CLR_SECONDARY.dark }
                : { color: CLR_SECONDARY.light }
            }
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

  return (
    <Container>
      <Content style={{ paddingHorizontal: 10 }}>
        <AddEditRecipe />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerBtn: {
    marginEnd: 3,
    elevation: 0,
    backgroundColor: 'transparent',
  },
});

export default AddRecipeScreen;
