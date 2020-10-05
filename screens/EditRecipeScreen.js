import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Image, PermissionsAndroid } from 'react-native';
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
import Realm from 'realm';
import { RecipeSchema } from '../database/recipeSchemas';
import ImagePicker from 'react-native-image-picker';
import RecipeCategories from '../xml/RecipeCategories.js';

const EditRecipeScreen = ({ navigation, recipe }) => {
  const [saved, savedToDb] = useState(false);
  const [recipeCategory, setRecipeCategory] = useState([]);
  const [recipeImage, setImageSource] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [selectedPickerValue, changePickerValue] = useState('');
  const [recipeInstruction, setRecipeInstruction] = useState('');
  const [inputIngredients, setIngredients] = useState([]);

  const imagePickerOptions = {
    title: 'Select Camera / Gallery',
    noData: true,
    storageOptions: {
      skipBackup: true,
      privateDirectory: true,
      path: 'images',
    },
  };

  const showImagePicker = async () => {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]).then((result) => {
      if (
        result['android.permission.CAMERA'] &&
        result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        ImagePicker.showImagePicker(imagePickerOptions, (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            setImageSource(source);
          }
        });
      }
    });
  };

  const readXmlFile = () => {
    var strXml = require('react-native-xml2js').parseString;
    var xml = RecipeCategories;
    try {
      strXml(xml, (err, result) => {
        setRecipeCategory(result.RecipeCategories.Category);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addNewIngredient = () => {
    setIngredients([...inputIngredients, { ingredient: '', measure: '' }]);
  };

  const removeNewIngredient = (index) => {
    const tempIngredients = [...inputIngredients];
    tempIngredients.splice(index, 1);
    setIngredients(tempIngredients);
  };

  const onIngredientTextChange = (index, target, value) => {
    const tempIngredients = [...inputIngredients];
    tempIngredients[index][target] = value;
    setIngredients(tempIngredients);
    console.log(inputIngredients);
  };

  const EditRecipeToDb = async () => {
    await Realm.open({
      schema: [RecipeSchema],
    })
      .then((realm) => {
        realm.write(() => {
         
        });
        {
          for (let p of realm.objects('Recipe')) {
            console.log(p);
          }
        }
        realm.close();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
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
              EditRecipeToDb();
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
    readXmlFile();
  }, []);

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
                onPress={() => showImagePicker()}>
                <Image
                  source={
                    recipeImage === null || recipeImage === ''
                      ? require('../assets/image_placeholder_200x150.png')
                      : recipeImage
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
              autoCapitalize="sentences"
              numberOfLines={1}
              placeholder="ex. Garlic Bread"
              value={recipeName}
              onChangeText={(value) => {
                setRecipeName(value);
                console.log('Recipe Name: ' + value);
              }}
            />
          </Item>
          <Item style={{ marginLeft: 0 }}>
            <Label style={{ fontSize: 15 }}>Category</Label>
            <Picker
              mode="dropdown"
              selectedValue={selectedPickerValue}
              onValueChange={(value) => changePickerValue(value)}>
              {recipeCategory.map((e, i) => {
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
                setRecipeInstruction(value);
                console.log('Recipe Instruction: ' + value);
              }}
            />
          </Item>
        </Form>
        <Button
          style={{ width: '100%', justifyContent: 'center' }}
          onPress={() => addNewIngredient()}>
          <Text>Add ingredient</Text>
        </Button>
        <List>
          {inputIngredients.map((customInput, key) => {
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
                  value={inputIngredients[key].ingredient}
                  onChangeText={(value) => {
                    onIngredientTextChange(key, 'ingredient', value);
                  }}
                />
                <Input
                  selectTextOnFocus
                  autoCapitalize="sentences"
                  numberOfLines={1}
                  placeholder="ex. 1 tbsp"
                  style={{ borderColor: 'gray', borderBottomWidth: 1 }}
                  value={inputIngredients[key].measure}
                  onChangeText={(value) =>
                    onIngredientTextChange(key, 'measure', value)
                  }
                />
                <Button transparent onPress={() => addNewIngredient()}>
                  <Icon
                    type="FontAwesome5"
                    name="plus-circle"
                    style={{ color: 'green', marginRight: 0 }}
                  />
                </Button>
                <Button transparent onPress={() => removeNewIngredient(key)}>
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

export default EditRecipeScreen;
