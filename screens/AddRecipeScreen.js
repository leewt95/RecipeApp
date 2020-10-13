import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { Image } from 'react-native';
import {
  Content,
  Container,
  Form,
  Item,
  Label,
  Input,
  Textarea,
  Picker,
  Card,
  CardItem,
  List,
  ListItem,
  Button,
  Icon,
  Text,
  Toast,
} from 'native-base';
import { NAVIGATION_STACK } from '../constants/Constants';
import { addRecipeToDb } from '../database/RecipeDatabase';
import { updateSelectedCategory } from '../reducer/RecipeCategoriesReducer';
import {
  showImagePicker,
  setRecipeName,
  setRecipeInstruction,
  onIngredientTextChange,
  addIngredient,
  removeIngredient,
  setRecipeToEdit,
  resetRecipeForms,
} from '../reducer/RecipeFormsReducer';
import { useDispatch, useSelector } from 'react-redux';

const AddRecipeScreen = ({ navigation, route }) => {
  const { recipeToEdit, editRecipe } = route.params;
  const [saved, savedToDb] = useState(false);
  const {
    recipeCategoriesWithoutAll,
    firstCategoryValueWithoutAll,
    selectedCategory,
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
          style={{
            marginEnd: 3,
            elevation: 0,
            backgroundColor: 'transparent',
          }}
          onPress={() => {
            if (!saved) {
              savedToDb(true);
            }
          }}>
          <Icon
            type="FontAwesome5"
            name="save"
            style={saved ? { color: 'lightgray' } : { color: 'black' }}
          />
        </Button>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!editRecipe) {
      updateSelectedCategory(firstCategoryValueWithoutAll, dispatch);
      resetRecipeForms(dispatch);
    } else {
      updateSelectedCategory(recipeToEdit.strCategory, dispatch);
      setRecipeToEdit(recipeToEdit, dispatch);
    }
  }, []);

  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      addRecipeToDb(
        navigation,
        recipeName,
        selectedCategory,
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
      <Content padder>
        <Form>
          <Item stackedLabel style={{ marginLeft: 0 }}>
            <Label>Image</Label>
            <Card style={{ marginTop: 10, marginBottom: 10 }}>
              <CardItem
                cardBody
                button
                style={{
                  width: '100%',
                }}
                onPress={() => showImagePicker(dispatch)}>
                <Image
                  source={
                    recipeImage === null || recipeImage === ''
                      ? require('../assets/image_placeholder_200x150.png')
                      : { uri: recipeImage }
                  }
                  style={{ width: '100%', height: 150 }}
                />
              </CardItem>
            </Card>
          </Item>
          <Item stackedLabel style={{ marginLeft: 0 }}>
            <Label>Name</Label>
            <Input
              selectTextOnFocus
              autoCapitalize="words"
              numberOfLines={1}
              placeholder="ex. Garlic Bread"
              value={recipeName}
              onChangeText={(value) => {
                setRecipeName(value, dispatch);
              }}
            />
          </Item>
          <Item style={{ marginLeft: 0 }}>
            <Label style={{ fontSize: 15 }}>Category</Label>
            <Picker
              mode="dropdown"
              selectedValue={selectedCategory}
              onValueChange={(value) => {
                updateSelectedCategory(value, dispatch);
              }}>
              {recipeCategoriesWithoutAll.map((e, i) => {
                return <Picker.Item key={i} label={e} value={e} />;
              })}
            </Picker>
          </Item>
          <Item stackedLabel style={{ marginLeft: 0, marginBottom: 20 }}>
            <Label>Instructions</Label>
            <Textarea
              selectTextOnFocus
              autoCapitalize="sentences"
              rowSpan={5}
              placeholder="1. ...."
              style={{ width: '100%' }}
              value={recipeInstruction}
              onChangeText={(value) => {
                setRecipeInstruction(value, dispatch);
              }}
            />
          </Item>
        </Form>
        <Button
          style={{ width: '100%', justifyContent: 'center' }}
          onPress={() => addIngredient(dispatch)}>
          <Text>Add ingredient</Text>
        </Button>
        <List>
          {recipeIngredients.map((customInput, key) => {
            return (
              <ListItem key={key} style={{ marginLeft: 0 }}>
                <Input
                  selectTextOnFocus
                  autoCapitalize="sentences"
                  numberOfLines={1}
                  placeholder="ex. Garlic"
                  style={{
                    borderColor: 'gray',
                    borderBottomWidth: 1,
                    marginEnd: 10,
                  }}
                  value={recipeIngredients[key].ingredient}
                  onChangeText={(value) => {
                    onIngredientTextChange(key, 'ingredient', value, dispatch);
                  }}
                />
                <Input
                  selectTextOnFocus
                  autoCapitalize="sentences"
                  numberOfLines={1}
                  placeholder="ex. 1 tbsp"
                  style={{ borderColor: 'gray', borderBottomWidth: 1 }}
                  value={recipeIngredients[key].measure}
                  onChangeText={(value) =>
                    onIngredientTextChange(key, 'measure', value, dispatch)
                  }
                />
                <Button
                  transparent
                  onPress={() => {
                    addIngredient(dispatch);
                  }}>
                  <Icon
                    type="FontAwesome5"
                    name="plus-circle"
                    style={{ color: 'green', marginRight: 0 }}
                  />
                </Button>
                <Button
                  transparent
                  onPress={() => removeIngredient(key, dispatch)}>
                  <Icon
                    type="FontAwesome5"
                    name="minus-circle"
                    style={{ color: 'red', marginRight: 0 }}
                  />
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default AddRecipeScreen;
