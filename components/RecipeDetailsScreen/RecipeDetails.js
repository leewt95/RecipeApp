import React from 'react';
import { Text } from 'react-native';
import { Content, Container } from 'native-base';

const RecipeDetails = ({ recipe }) => {
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

export default RecipeDetails;
