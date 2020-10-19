import React from 'react';
import { StyleSheet, Image } from 'react-native';
import {
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
  Body,
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
import {
  recipeFormExamples,
  TARGET_INGREDIENT,
  TARGET_MEASURE,
} from '../../constants/Constants';
import { CLR_SECONDARY } from '../../constants/Colors';

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
    <>
      <Form>
        <Item stackedLabel style={styles.itemAdjust}>
          <Label style={styles.labelColor}>Image</Label>
          <Card style={styles.cardBody}>
            <CardItem
              cardBody
              button
              style={{
                width: '100%',
              }}
              onPress={() => showImagePicker(dispatch)}>
              <Image
                source={
                  recipeImage === ''
                    ? require('../../assets/image_placeholder_200x150.png')
                    : { uri: recipeImage }
                }
                style={styles.cardImage}
              />
              <Icon
                type="FontAwesome5"
                name="edit"
                style={styles.cardIconImage}
              />
            </CardItem>
          </Card>
        </Item>
        <Item stackedLabel style={styles.itemAdjust}>
          <Label style={styles.labelColor}>Name</Label>
          <Input
            selectTextOnFocus
            autoCapitalize="words"
            numberOfLines={1}
            placeholder={recipeFormExamples.name}
            placeholderTextColor="lightgray"
            value={recipeName}
            onChangeText={(value) => {
              setRecipeName(value, dispatch);
            }}
          />
        </Item>
        <Body style={[styles.itemAdjust, { flexDirection: 'row' }]}>
          <Label
            style={[styles.labelColor, { fontSize: 15, alignSelf: 'center' }]}>
            Category
          </Label>
          <Picker
            mode="dropdown"
            style={{marginTop: 3}}
            selectedValue={selectedCategoryWithoutAll}
            onValueChange={(value) => {
              updateSelectedCategoryWithoutAll(value, dispatch);
            }}>
            {recipeCategoriesWithoutAll.map((e, i) => {
              return <Picker.Item key={i} label={e} value={e} />;
            })}
          </Picker>
        </Body>
        <Item stackedLabel style={[styles.itemAdjust, { marginBottom: 20 }]}>
          <Label style={styles.labelColor}>Instructions</Label>
          <Textarea
            selectTextOnFocus
            autoCapitalize="sentences"
            rowSpan={7}
            placeholder={recipeFormExamples.instruction}
            placeholderTextColor="lightgray"
            style={{ width: '100%' }}
            value={recipeInstruction}
            onChangeText={(value) => {
              setRecipeInstruction(value, dispatch);
            }}
          />
        </Item>
      </Form>
      <Button
        style={styles.btnAddIngredient}
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
                placeholder={recipeFormExamples.ingredient}
                placeholderTextColor="lightgray"
                style={styles.inputIngredient}
                value={recipeIngredients[key].ingredient}
                onChangeText={(value) => {
                  onIngredientTextChange(
                    key,
                    TARGET_INGREDIENT,
                    value,
                    dispatch,
                  );
                }}
              />
              <Input
                selectTextOnFocus
                autoCapitalize="sentences"
                numberOfLines={1}
                placeholder={recipeFormExamples.measure}
                placeholderTextColor="lightgray"
                style={styles.inputMeasure}
                value={recipeIngredients[key].measure}
                onChangeText={(value) =>
                  onIngredientTextChange(key, TARGET_MEASURE, value, dispatch)
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
                  style={styles.iconPlus}
                />
              </Button>
              <Button
                transparent
                onPress={() => removeIngredient(key, dispatch)}>
                <Icon
                  type="FontAwesome5"
                  name="minus-circle"
                  style={styles.iconMinus}
                />
              </Button>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

const styles = StyleSheet.create({
  itemAdjust: {
    marginLeft: 0,
    borderBottomColor: CLR_SECONDARY.dark,
    borderBottomWidth: 1,
  },
  labelColor: {
    color: CLR_SECONDARY.normal,
    textShadowColor: 'black',
    textShadowRadius: 1,
  },
  cardBody: {
    marginTop: 10,
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    zIndex: -1,
  },
  cardIconImage: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'flex-end',
    color: CLR_SECONDARY.light,
    padding: 5,
    textAlign: 'right',
  },
  btnAddIngredient: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: CLR_SECONDARY.normal,
  },
  inputIngredient: {
    borderColor: CLR_SECONDARY.dark,
    borderBottomWidth: 1,
    marginEnd: 10,
  },
  inputMeasure: {
    borderColor: CLR_SECONDARY.dark,
    borderBottomWidth: 1,
  },
  iconPlus: {
    color: 'green',
    marginRight: 0,
  },
  iconMinus: {
    color: 'red',
    marginRight: 0,
  },
});

export default AddEditRecipe;
