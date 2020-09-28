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
      </Content>
    </Container>
  );
};

export default HomeScreen;
