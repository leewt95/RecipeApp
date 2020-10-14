import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { Container, Content } from 'native-base';
import RecipeOfTheDay from '../components/HomeScreen/RecipeOfTheDay';
import {
  viewDatabase,
  clearDatabase,
  checkIfDatabaseExist,
} from '../database/RecipeDatabase';
import { getRecipeOfTheDay } from '../reducer/RecipeApiReducer';
import { readRecipeCategories } from '../reducer/RecipeCategoriesReducer';
import { useDispatch } from 'react-redux';
import { NAVIGATION_STACK } from '../constants/Constants';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    readRecipeCategories(dispatch);
    checkIfDatabaseExist();
  }, []);

  return (
    <Container>
      <Content padder>
        <RecipeOfTheDay />
        <Button
          title="Get new recipe"
          onPress={() => getRecipeOfTheDay(dispatch)}
        />
        <Button title="View database" onPress={() => viewDatabase()} />
        <Button title="Clear database" onPress={() => clearDatabase()} />
        <Button
          title="Add custom recipe"
          onPress={() =>
            navigation.navigate(NAVIGATION_STACK.ADD_NEW_RECIPE.name, {
              recipeToEdit: [],
              editRecipe: false,
            })
          }
        />
        <Button
          title="Recipe list"
          onPress={() =>
            navigation.navigate(NAVIGATION_STACK.RECIPE_LIST.name, {
              toggleSave: false,
            })
          }
        />
      </Content>
    </Container>
  );
};

export default HomeScreen;
