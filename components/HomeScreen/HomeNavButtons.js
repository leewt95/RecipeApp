import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { CardItem } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_STACK } from '../../constants/Constants';

const HomeNavButtons = () => {
  const navigation = useNavigation();

  return (
    <>
      {/* Add Recipe */}
      <CardItem
        cardBody
        button
        style={styles.homeNavBody}
        onPress={() =>
          navigation.navigate(NAVIGATION_STACK.ADD_NEW_RECIPE.name, {
            recipeToEdit: [],
            editRecipe: false,
          })
        }>
        <Image
          source={require('../../assets/image_add_recipe.jpg')}
          style={styles.homeNavImage}
        />
        <Text style={styles.homeNavText}>Add Recipe</Text>
      </CardItem>

      {/* View Recipes */}
      <CardItem
        cardBody
        button
        style={styles.homeNavBody}
        onPress={() =>
          navigation.navigate(NAVIGATION_STACK.RECIPE_LIST.name, {
            toggleSave: false,
          })
        }>
        <Image
          source={require('../../assets/image_view_recipe.jpg')}
          style={styles.homeNavImage}
        />
        <Text style={styles.homeNavText}>View Recipes</Text>
      </CardItem>
    </>
  );
};

const styles = StyleSheet.create({
  homeNavBody: { flexDirection: 'row', flex: 1 },
  homeNavImage: { width: '100%', height: '100%', zIndex: -1 },
  homeNavText: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default HomeNavButtons;
