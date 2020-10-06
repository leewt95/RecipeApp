import React, { useEffect, useState, useLayoutEffect } from 'react';
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
  Thumbnail,
  Left,
  Right,
  Body,
  Text,
  Button,
  Icon,
} from 'native-base';
import Realm from 'realm';
import { RecipeSchema } from '../database/recipeSchemas';
import RecipeCategories from '../xml/RecipeCategories.js';

const ListRecipeScreen = ({ navigation }) => {
  const [recipeList, setRecipeList] = useState([]);
  const [recipeCategory, setRecipeCategory] = useState([]);
  const [selectedPickerValue, changePickerValue] = useState('Beef');

  const filterRecipe = (filterQuery) => {
    Realm.open({
      schema: [RecipeSchema],
    }).then((realm) => {
      var recipeArray = [];
      let recipeQuery = realm
        .objects('Recipe')
        .filtered(`strCategory = "${filterQuery}"`);
      if (recipeQuery.length > 0) {
        for (let p of recipeQuery) {
          recipeArray.push(JSON.parse(JSON.stringify(p)));
        }
      }
      setRecipeList(recipeArray);
      realm.close();
    });
  };

  const deleteRecipe = (idMeal, index) => {
    Realm.open({
      schema: [RecipeSchema],
    }).then((realm) => {
      let deleteRecipe = realm
        .objects('Recipe')
        .filtered(`idMeal = "${idMeal}"`);
      realm.write(() => {
        realm.delete(deleteRecipe);
        console.log(`DELETED ${idMeal}`);
      });
      realm.close();
    });
    const recipeListCopy = [...recipeList];
    recipeListCopy.splice(index, 1);
    setRecipeList(recipeListCopy);
    console.log('DELETED: new size-> ' + recipeList.length);
  };

  useEffect(() => {
    const navEventUnsubscribe = navigation.addListener('focus', () => {
      Realm.open({
        schema: [RecipeSchema],
      })
        .then((realm) => {
          var recipeArray = [];
          if (realm.objects('Recipe').length > 0) {
            for (let p of realm.objects('Recipe')) {
              recipeArray.push(JSON.parse(JSON.stringify(p)));
            }
          }
          setRecipeList(recipeArray);
          realm.close();
        })
        .catch((e) => {
          console.log(e);
        });
    });

    var strXml = require('react-native-xml2js').parseString;
    var xml = RecipeCategories;
    try {
      strXml(xml, (err, result) => {
        setRecipeCategory(result.RecipeCategories.Category);
      });
    } catch (e) {
      console.log(e);
    }

    return navEventUnsubscribe
  }, []);

  return (
    <Container>
      <Content>
        <Item style={{ marginLeft: 10, marginRight: 10, marginBottom: 20 }}>
          <Label style={{ fontSize: 15 }}>Category</Label>
          <Picker
            mode="dropdown"
            selectedValue={selectedPickerValue}
            onValueChange={(value) => {
              changePickerValue(value);
              filterRecipe(value);
            }}>
            {recipeCategory.map((e, i) => {
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
                  navigation.navigate('RecipeDetails', {
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
                      navigation.navigate('AddNewRecipe', {
                        recipeToEdit: recipeList[i],
                        editRecipe: true,
                      })
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
                    onPress={() => deleteRecipe(e.idMeal, i)}>
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
