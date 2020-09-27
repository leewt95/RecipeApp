import React, { useState, useEffect } from 'react';
import { Button, View, Text, Image } from 'react-native';
import TheMealDb from '../api/TheMealDb';

const HomeScreen = ({ navigation }) => {
  const [recipe, setRecipe] = useState([]);

  const getRecipeOfTheDay = async () => {
    try {
      const response = await TheMealDb.get('/random.php');
      setRecipe(response.data.meals[0]);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getRecipeOfTheDay();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Image
        source={{ uri: recipe.strMealThumb }}
        style={{ width: 150, height: 150 }}
      />
      <Text>{recipe.idMeal}</Text>
      <Button title="Go to Details" onPress={() => getRecipeOfTheDay()} />
    </View>
  );
};

export default HomeScreen;
