import React, { useEffect } from 'react';
import RecipeList from '../components/RecipeListScreen/RecipeList';
import { updateSelectedCategory } from '../reducer/RecipeCategoriesReducer';
import { loadRecipeFromDatabase } from '../reducer/RecipeDatabaseReducer';
import { useSelector, useDispatch } from 'react-redux';

const ListRecipeScreen = ({ navigation }) => {
  const { firstCategoryValue } = useSelector(
    ({ recipeCategoriesReducer }) => recipeCategoriesReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    updateSelectedCategory(firstCategoryValue, dispatch);
    loadRecipeFromDatabase(dispatch);
  }, []);

  return <RecipeList navigation={navigation} />;
};

export default ListRecipeScreen;
