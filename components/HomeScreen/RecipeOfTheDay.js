import React, { useEffect } from 'react';
import { Text, Image } from 'react-native';
import { View, Card, CardItem } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { getRecipeOfTheDay } from '../../reducer/RecipeApiReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NAVIGATION_STACK } from '../../constants/Constants';

const RecipeOfTheDay = () => {
  const { recipeApi } = useSelector(({ recipeApiReducer }) => recipeApiReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getRecipeOfTheDay(dispatch);
  }, []);

  return (
    <View>
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
    </View>
  );
};

export default RecipeOfTheDay;
