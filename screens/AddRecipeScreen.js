import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Button, View, Image, PermissionsAndroid } from 'react-native';
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
} from 'native-base';
import Realm from 'realm';
import { RecipeSchema } from '../database/recipeSchemas';
import ImagePicker from 'react-native-image-picker';
import RecipeCategories from '../xml/RecipeCategories.js';

const AddRecipeScreen = ({ navigation }) => {
  const [imageSource, setImageSource] = useState(null);
  const [selectedPickerValue, changePickerValue] = useState('');
  const [inputForms, addForms] = useState([]);
  const [recipeCategory, setRecipeCategory] = useState([]);

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

  const addNewIngredient = () => {
    addForms([...inputForms, { meta_name: 'value', meta_value: 'value' }]);
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

  useEffect(() => {
    readXmlFile();
  }, []);

  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem
            cardBody
            button
            style={{
              flexDirection: 'column',
            }}
            onPress={() => showImagePicker()}>
            <Image
              source={
                imageSource === null
                  ? { uri: 'https://via.placeholder.com/200x150' }
                  : imageSource
              }
              style={{ width: '100%', height: 150 }}
            />
          </CardItem>
        </Card>
        <Form>
          <Item stackedLabel style={{ marginLeft: 0 }}>
            <Label>Name</Label>
            <Input />
          </Item>
          <Item stackedLabel style={{ marginLeft: 0 }}>
            <Label>Instructions</Label>
            <Textarea
              style={{ width: '100%' }}
              selectTextOnFocus
              rowSpan={5}
              placeholder="1. ...."
            />
          </Item>
          <Item style={{ marginLeft: 0, marginBottom: 20 }}>
            <Label style={{ fontSize: 15 }}>Category</Label>
            <Picker
              mode="dropdown"
              selectedValue={selectedPickerValue}
              onValueChange={(value) => changePickerValue(value)}>
              {recipeCategory.map((e, i) => {
                return <Picker.Item label={e} value={e} />;
              })}
            </Picker>
          </Item>
        </Form>
        <Button title="Generate a button" onPress={() => addNewIngredient()} />
        {inputForms.map((customInput, key) => {
          return (
            <Button
              key={key}
              title={`Button ${key + 1}`}
              onPress={() => addNewIngredient()}
            />
          );
        })}
      </Content>
    </Container>
  );
};

export default AddRecipeScreen;
