import React, { useLayoutEffect } from 'react';
import { Button, Text, Image, Pressable } from 'react-native';
import { Content, Container, Icon } from 'native-base';

const RecipeDetailsScreen = ({ navigation, route }) => {
  const { recipe } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Icon type="FontAwesome5" name="save" />,
    });
  }, [navigation]);

  return (
    <Container>
      <Button title="Save recipe" />
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
