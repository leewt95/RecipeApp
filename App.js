import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './screens/HomeScreen';
import RecipeDetailsScreen from './screens/RecipeDetailsScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import RecipeListScreen from './screens/RecipeListScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'RecipeApp React Native',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetailsScreen}
          options={({ route }) => ({ title: route.params.recipe.strMeal })}
        />
        <Stack.Screen
          name="AddNewRecipe"
          component={AddRecipeScreen}
          options={{
            title: 'Add Recipe',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="RecipeList"
          component={RecipeListScreen}
          options={{
            title: 'Recipe List',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
