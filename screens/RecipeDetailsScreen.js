import React, { useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { Content, Container, Icon, Button } from 'native-base';

const RecipeDetailsScreen = ({ navigation, route }) => {
  const { recipe } = route.params;

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
          }}>
          <Icon type="FontAwesome5" name="save" style={{ color: 'black' }} />
        </Button>
      ),
    });
  }, [navigation]);

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
