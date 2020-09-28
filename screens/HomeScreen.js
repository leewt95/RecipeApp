import React, { useState, useEffect } from 'react';
import { Button, Text, Image } from 'react-native';
import { Card, CardItem, Container, Content } from 'native-base';
import TheMealDb from '../api/TheMealDb';

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

  useEffect(() => {
    getRecipeOfTheDay();
  }, []);

  return (
    <Container>
      <Content style={{ margin: 10 }}>
        <Text>Recipe of the day</Text>
        <Card>
          <CardItem
            cardBody
            button
            bordered
            onPress={() => navigation.navigate('Welcome')}>
            <Image
              source={{ uri: recipe.strMealThumb }}
              style={{ width: null, height: 200, flex: 1 }}
              onPress={() => navigation.navigate('Welcome')}
            />
          </CardItem>
          <CardItem footer>
            <Text>{recipe.strMeal}</Text>
          </CardItem>
        </Card>
        <Text>Powered by TheMealDB</Text>
        <Button title="Get new recipe" onPress={() => getRecipeOfTheDay()} />
      </Content>
    </Container>
  );
};

export default HomeScreen;
