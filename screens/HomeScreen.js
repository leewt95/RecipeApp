import React, { useEffect } from 'react';
import { Button, Text, Image } from 'react-native';
import { Card, CardItem, Container, Content } from 'native-base';
import { viewDatabase, clearDatabase } from '../database/RecipeDatabase';
import { getRecipeOfTheDay } from '../reducer/RecipeApiReducer';
import { readRecipeCategories } from '../reducer/RecipeCategoriesReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NAVIGATION_STACK } from '../constants/Constants';

const HomeScreen = ({ navigation }) => {
  const { recipeApi } = useSelector(({ recipeApiReducer }) => recipeApiReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getRecipeOfTheDay(dispatch);
    readRecipeCategories(dispatch);
  }, []);

  return (
    <Container>
      <Content padder>
        <Text>Recipe of the day</Text>
        <Card>
          <CardItem
            cardBody
            button
            bordered
            style={{
              flexDirection: 'column',
            }}
            onPress={() =>
              navigation.navigate(NAVIGATION_STACK.RECIPE_DETAIL.name, {
                recipe: recipeApi,
                toggleSave: true,
              })
            }>
            <Image
              source={{ uri: recipeApi.strMealThumb }}
              style={{ width: '100%', height: 200 }}
            />
            <Text>{recipeApi.strMeal}</Text>
          </CardItem>
        </Card>
        <Text>Powered by TheMealDB</Text>
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
