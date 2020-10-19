import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Icon, Button, Toast } from 'native-base';
import RecipeDetails from '../components/RecipeDetailsScreen/RecipeDetails';
import { addRecipeToDb, checkIfRecipeExist } from '../database/RecipeDatabase';
import { CLR_SECONDARY } from '../constants/Colors';

const RecipeDetailsScreen = ({ navigation, route }) => {
  const [saved, savedToDb] = useState(false);
  const { recipe, toggleSave } = route.params;

  useLayoutEffect(() => {
    if (toggleSave) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            rounded
            androidRippleColor={CLR_SECONDARY.normal}
            style={styles.headerBtn}
            onPress={() => {
              if (!saved) {
                savedToDb(true);
                addRecipeToDb(recipe);
                Toast.show({
                  text: `Added ${recipe.strMeal} successfully`,
                  buttonText: 'Okay',
                  duration: 3000,
                });
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
    }
  }, [navigation, saved]);

  useEffect(() => {
    if (toggleSave) {
      checkIfRecipeExist(recipe, (ifRecipeExist) => {
        savedToDb(ifRecipeExist);
      });
    }
  }, []);

  return (
    <Container>
      <Content>
        <RecipeDetails recipe={recipe} />
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

export default RecipeDetailsScreen;
