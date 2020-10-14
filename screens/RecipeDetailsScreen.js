import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { Content, Container, Icon, Button, Toast } from 'native-base';
import { addRecipeToDb, checkIfRecipeExist } from '../database/RecipeDatabase';

const RecipeDetailsScreen = ({ navigation, route }) => {
  const [saved, savedToDb] = useState(false);
  const { recipe, toggleSave } = route.params;

  useLayoutEffect(() => {
    if (toggleSave) {
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
                addRecipeToDb(recipe);
                Toast.show({
                  text: `Added ${recipe.strMeal} successfully`,
                  buttonText: 'Okay',
                  duration: 3000,
                });
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
    }
  }, [navigation, saved]);

  useEffect(() => {
    if (toggleSave) {
      checkIfRecipeExist(recipe, (ifRecipeExist) => {
        savedToDb(ifRecipeExist);
      });
    }
  }, []);

  return (
    <Container>
      <Content padder>
        {Object.values(recipe).map((e, i) => {
          if (e !== null && e !== '') {
            return <Text key={i}>{e}</Text>;
          }
        })}
      </Content>
    </Container>
  );
};

export default RecipeDetailsScreen;
