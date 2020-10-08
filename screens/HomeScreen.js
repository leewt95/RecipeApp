import React, { useEffect } from 'react';
import { Button, Text, Image } from 'react-native';
import { Card, CardItem, Container, Content } from 'native-base';
import Realm from 'realm';
import { getRecipeOfTheDay } from '../reducer/RecipeApiReducer';
import { RecipeSchema } from '../database/RecipeSchema';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const { recipeApi } = useSelector(({ recipeApiReducer }) => recipeApiReducer);
  const dispatch = useDispatch();

  const viewDatabase = async () => {
    await Realm.open({
      schema: [RecipeSchema],
    })
      .then((realm) => {
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

  const clearDatabase = async () => {
    await Realm.open({
      schema: [RecipeSchema],
    })
      .then((realm) => {
        realm.write(() => {
          realm.delete(realm.objects('Recipe'));
        });
        realm.close();
        console.log('Database cleared!');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRecipeOfTheDay(dispatch);
  }, []);

  return (
    <Container>
      <Content padder>
        <Text>Recipe of the day</Text>
        <Card>
          <CardItem
            cardBody
            button
            bordered
            style={{
              flexDirection: 'column',
            }}
            onPress={() =>
              navigation.navigate('RecipeDetails', {
                recipe: recipeApi,
                toggleSave: true,
              })
            }>
            <Image
              source={{ uri: recipeApi.strMealThumb }}
              style={{ width: '100%', height: 200 }}
            />
            <Text>{recipeApi.strMeal}</Text>
          </CardItem>
        </Card>
        <Text>Powered by TheMealDB</Text>
        <Button
          title="Get new recipe"
          onPress={() => getRecipeOfTheDay(dispatch)}
        />
        <Button title="View database" onPress={() => viewDatabase()} />
        <Button title="Clear database" onPress={() => clearDatabase()} />
        <Button
          title="Add custom recipe"
          onPress={() =>
            navigation.navigate('AddNewRecipe', {
              recipeToEdit: [],
              editRecipe: false,
            })
          }
        />
        <Button
          title="Recipe list"
          onPress={() =>
            navigation.navigate('RecipeList', { toggleSave: false })
          }
        />
      </Content>
    </Container>
  );
};

export default HomeScreen;
