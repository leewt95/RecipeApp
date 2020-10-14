import React from 'react';
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
} from 'native-base';
import { updateSelectedCategoryWithoutAll } from '../../reducer/RecipeCategoriesReducer';
import {
  showImagePicker,
  setRecipeName,
  setRecipeInstruction,
  onIngredientTextChange,
  addIngredient,
  removeIngredient,
} from '../../reducer/RecipeFormsReducer';
import { useDispatch, useSelector } from 'react-redux';

const AddEditRecipe = () => {
  const {
    recipeCategoriesWithoutAll,
    selectedCategoryWithoutAll,
  } = useSelector(({ recipeCategoriesReducer }) => recipeCategoriesReducer);
  const {
    recipeImage,
    recipeName,
    recipeInstruction,
    recipeIngredients,
  } = useSelector(({ recipeFormsReducer }) => recipeFormsReducer);
  const dispatch = useDispatch();

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
                      ? require('../../assets/image_placeholder_200x150.png')
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
              selectedValue={selectedCategoryWithoutAll}
              onValueChange={(value) => {
                updateSelectedCategoryWithoutAll(value, dispatch);
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

export default AddEditRecipe;
