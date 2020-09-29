import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { Content, Container, Icon, Button } from 'native-base';
import Realm from 'realm';
import { RecipeSchema } from '../database/recipeSchemas';

const RecipeDetailsScreen = ({ navigation, route }) => {
  const [saved, savedToDb] = useState(false);
  const { recipe } = route.params;

  const AddRecipeToDb = async () => {
    await Realm.open({
      schema: [RecipeSchema],
    })
      .then((realm) => {
        realm.write(() => {
          realm.create('Recipe', {
            recipeName: recipe.strMeal,
            recipeCategory: recipe.strCategory,
          });
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
              AddRecipeToDb();
            }
          }}>
          <Icon
            type="FontAwesome5"
            name="save"
            style={saved ? { color: 'gray' } : { color: 'black' }}
          />
        </Button>
      ),
    });
  }, [navigation, saved]);

  useEffect(() => {
    Realm.open({
      schema: [RecipeSchema],
    })
      .then((realm) => {
        {
          for (let p of realm.objects('Recipe')) {
            if (p.recipeName === recipe.strMeal) {
              console.log(`${recipe.strMeal} already exist!`);
              savedToDb(true);
              break;
            }
          }
        }
        realm.close();
      })
      .catch((e) => {
        console.log(e);
      });
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
