import React from 'react';
import { Button, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const RecipeDetailsScreen = ({ navigation, route }) => {

  const { recipe } = route.params;
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView>
        {Object.values(recipe).map((e, i) => {
          return <Text key={i}>{e}</Text>;
        })}
      </ScrollView>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default RecipeDetailsScreen;
