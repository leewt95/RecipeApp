import React, { useState, useEffect } from 'react';
import { Button, Text, Image } from 'react-native';
import { Card, CardItem, Container, Content } from 'native-base';
import TheMealDb from '../api/TheMealDb';
import Realm from 'realm';
import { RecipeSchema } from '../database/recipeSchemas';

const HomeScreen = ({ navigation }) => {
  const [recipe, setRecipe] = useState([]);

  const getRecipeOfTheDay = async () => {
    await TheMealDb.get('/random.php')
      .then((response) => {
        setRecipe(response.data.meals[0]);
      })
      .catch((e) => {
        alert(e);
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
    getRecipeOfTheDay();
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
              navigation.navigate('RecipeDetails', { recipe: recipe })
            }>
            <Image
              source={{ uri: recipe.strMealThumb }}
              style={{ width: '100%', height: 200 }}
            />
            <Text>{recipe.strMeal}</Text>
          </CardItem>
        </Card>
        <Text>Powered by TheMealDB</Text>
        <Button title="Get new recipe" onPress={() => getRecipeOfTheDay()} />
        <Button title="Clear database" onPress={() => clearDatabase()} />
      </Content>
    </Container>
  );
};

export default HomeScreen;
