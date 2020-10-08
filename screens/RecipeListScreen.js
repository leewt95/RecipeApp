import React, { useEffect, useRef } from 'react';
import {
  Content,
  Container,
  Item,
  Label,
  Picker,
  List,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Body,
  Text,
  Button,
  Icon,
} from 'native-base';
import { updateSelectedCategory } from '../reducer/RecipeCategoriesReducer';
import {
  loadRecipeFromDatabase,
  filterRecipe,
  deleteRecipe,
} from '../reducer/RecipeDatabaseReducer';
import { useSelector, useDispatch } from 'react-redux';
import { NAVIGATION_STACK } from '../constants/Constants';

const ListRecipeScreen = ({ navigation }) => {
  const { recipeList } = useSelector(
    ({ recipeDatabaseReducer }) => recipeDatabaseReducer,
  );
  const {
    recipeCategories,
    firstCategoryValue,
    selectedCategory,
  } = useSelector(({ recipeCategoriesReducer }) => recipeCategoriesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    updateSelectedCategory(firstCategoryValue, dispatch);
    loadRecipeFromDatabase(dispatch);
  }, []);

  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      const navEventUnsubscribe = navigation.addListener('focus', () => {
        filterRecipe(selectedCategory, dispatch);
      });
      return navEventUnsubscribe;
    } else {
      didMountRef.current = true;
    }
  }, [recipeList]);

  return (
    <Container>
      <Content>
        <Item style={{ marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
          <Label style={{ fontSize: 15 }}>Category</Label>
          <Picker
            mode="dropdown"
            selectedValue={selectedCategory}
            onValueChange={(value) => {
              updateSelectedCategory(value, dispatch);
              filterRecipe(value, dispatch);
            }}>
            {recipeCategories.map((e, i) => {
              return <Picker.Item key={i} label={e} value={e} />;
            })}
          </Picker>
        </Item>
        <List>
          {recipeList.map((e, i) => {
            return (
              <ListItem
                thumbnail
                key={i}
                onPress={() =>
                  navigation.navigate(NAVIGATION_STACK.RECIPE_DETAIL.name, {
                    recipe: recipeList[i],
                    toggleSave: false,
                  })
                }>
                <Left>
                  <Thumbnail
                    square
                    source={
                      recipeList[i].strMealThumb === ''
                        ? require('../assets/image_placeholder_200x150.png')
                        : { uri: `${e.strMealThumb}` }
                    }
                  />
                </Left>
                <Body>
                  <Text numberOfLines={1}>{e.strMeal}</Text>
                  <Text note numberOfLines={1}>
                    {e.strCategory}
                  </Text>
                </Body>
                <Right style={{ flexDirection: 'row' }}>
                  <Button
                    transparent
                    style={{ alignSelf: 'center' }}
                    onPress={() =>
                      navigation.navigate(
                        NAVIGATION_STACK.ADD_NEW_RECIPE.name,
                        {
                          recipeToEdit: recipeList[i],
                          editRecipe: true,
                        },
                      )
                    }>
                    <Icon
                      type="FontAwesome5"
                      name="edit"
                      style={{ color: 'blue', marginLeft: 0, marginRight: 0 }}
                    />
                  </Button>
                  <Button
                    transparent
                    style={{ alignSelf: 'center' }}
                    onPress={() => deleteRecipe(e.idMeal, i, dispatch)}>
                    <Icon
                      type="FontAwesome5"
                      name="trash-alt"
                      style={{ color: 'red', marginRight: 3 }}
                    />
                  </Button>
                </Right>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default ListRecipeScreen;
