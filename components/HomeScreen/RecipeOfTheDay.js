import React, { useEffect } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { CardItem, Spinner } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { getRecipeOfTheDay } from '../../reducer/RecipeApiReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NAVIGATION_STACK } from '../../constants/Constants';
import { CLR_SECONDARY } from '../../constants/Colors';

const RecipeOfTheDay = () => {
  const { recipeApi, isLoading } = useSelector(
    ({ recipeApiReducer }) => recipeApiReducer,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    getRecipeOfTheDay(dispatch);
  }, []);

  if (isLoading) {
    return (
      <Spinner
        color={CLR_SECONDARY.light}
        style={{ backgroundColor: 'black', flex: 2 }}
      />
    );
  } else {
    return (
      <CardItem
        cardBody
        button
        style={styles.cardBody}
        onPress={() =>
          navigation.navigate(NAVIGATION_STACK.RECIPE_DETAIL.name, {
            recipe: recipeApi,
            toggleSave: true,
          })
        }>
        <Image
          source={{ uri: recipeApi.strMealThumb }}
          style={styles.cardRecipeImage}
        />
        <Text style={styles.cardRecipeName}>{recipeApi.strMeal}</Text>
        <Text style={styles.cardPoweredBy}>Powered by TheMealDB</Text>
      </CardItem>
    );
  }
};

const styles = StyleSheet.create({
  cardBody: {
    flexDirection: 'row',
    flex: 2,
  },
  cardRecipeImage: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  cardRecipeName: {
    position: 'absolute',
    width: '100%',
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 24,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardPoweredBy: {
    position: 'absolute',
    width: '100%',
    color: 'white',
    alignSelf: 'flex-end',
    fontSize: 12,
    fontStyle: 'italic',
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default RecipeOfTheDay;
