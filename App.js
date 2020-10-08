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
import { Provider } from 'react-redux';
import { recipeStore } from './reducer/RootReducer.js';
import { NAVIGATION_STACK } from './constants/Constants';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={recipeStore}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={NAVIGATION_STACK.HOME.name}
          screenOptions={{
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Stack.Screen
            name={NAVIGATION_STACK.HOME.name}
            component={HomeScreen}
            options={{
              title: NAVIGATION_STACK.HOME.title,
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name={NAVIGATION_STACK.RECIPE_DETAIL.name}
            component={RecipeDetailsScreen}
            options={({ route }) => ({ title: route.params.recipe.strMeal })}
          />
          <Stack.Screen
            name={NAVIGATION_STACK.ADD_NEW_RECIPE.name}
            component={AddRecipeScreen}
            options={{
              title: NAVIGATION_STACK.ADD_NEW_RECIPE.title,
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name={NAVIGATION_STACK.RECIPE_LIST.name}
            component={RecipeListScreen}
            options={{
              title: NAVIGATION_STACK.RECIPE_LIST.title,
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
