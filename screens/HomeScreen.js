import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Card } from 'native-base';
import RecipeOfTheDay from '../components/HomeScreen/RecipeOfTheDay';
import HomeNavButtons from '../components/HomeScreen/HomeNavButtons';
import { checkIfDatabaseExist } from '../database/RecipeDatabase';
import { readRecipeCategories } from '../reducer/RecipeCategoriesReducer';
import { useDispatch } from 'react-redux';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    readRecipeCategories(dispatch);
    checkIfDatabaseExist();
  }, []);

  return (
    <Container>
      <Card style={styles.cardContainer}>
        <RecipeOfTheDay />
        <HomeNavButtons />
      </Card>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 4,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default HomeScreen;
