import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { View, Form, Item, Label } from 'native-base';
import { Table, Row, Rows } from 'react-native-table-component';
import {
  RECIPE_STR_INGREDIENT,
  RECIPE_STR_MEASURE,
} from '../../constants/Constants';
import { CLR_SECONDARY } from '../../constants/Colors';

const RecipeDetails = ({ recipe }) => {
  const tableHead = ['#', 'Ingredient', 'Measure'];
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const tempIngredients = [];
    for (let p = 0; p < 20; p++) {
      if (
        recipe[`${RECIPE_STR_INGREDIENT}${p + 1}`] != null &&
        recipe[`${RECIPE_STR_INGREDIENT}${p + 1}`] != ''
      ) {
        tempIngredients.push([
          `${p + 1}`,
          recipe[`${RECIPE_STR_INGREDIENT}${p + 1}`],
          recipe[`${RECIPE_STR_MEASURE}${p + 1}`],
        ]);
      }
    }
    setTableData(tempIngredients);
  }, []);

  return (
    <Form>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.formMargin}>
        <Item inlineLabel style={styles.itemMargin}>
          <Label style={[styles.itemContentMargin, styles.labelColor]}>
            Name
          </Label>
          <Text style={styles.itemContentMargin}>{recipe.strMeal}</Text>
        </Item>
        <Item inlineLabel style={styles.itemMargin}>
          <Label style={[styles.itemContentMargin, styles.labelColor]}>
            Category
          </Label>
          <Text style={styles.itemContentMargin}>{recipe.strCategory}</Text>
        </Item>
        <Item inlineLabel style={[styles.itemMargin, styles.itemFlexDir]}>
          <Label style={[styles.labelAdjust, styles.labelColor]}>
            Instructions
          </Label>
          <Text style={styles.itemContentMargin}>{recipe.strInstructions}</Text>
        </Item>
        <Item inlineLabel style={[styles.itemMargin, styles.itemFlexDir]}>
          <Label style={[styles.labelAdjust, styles.labelColor]}>
            Ingredients
          </Label>
          <Table
            style={{ width: '100%' }}
            borderStyle={styles.tableBorderStyle}>
            <Row
              data={tableHead}
              flexArr={[1, 5, 5]}
              style={styles.tableHeadStyle}
              textStyle={[
                styles.tableTextStyle,
                { color: 'white', fontWeight: 'bold' },
              ]}
            />
            <Rows
              data={tableData}
              flexArr={[1, 5, 5]}
              textStyle={styles.tableTextStyle}
            />
          </Table>
        </Item>
      </View>
    </Form>
  );
};

const styles = StyleSheet.create({
  formMargin: { margin: 10 },
  image: {
    width: '100%',
    height: 250,
  },
  itemMargin: {
    marginLeft: 0,
    marginBottom: 5,
  },
  itemFlexDir: {
    flexDirection: 'column',
  },
  labelColor: {
    color: CLR_SECONDARY.normal,
    textShadowColor: 'black',
    textShadowRadius: 1,
  },
  labelAdjust: { alignSelf: 'flex-start', marginBottom: 5 },
  itemContentMargin: {
    marginBottom: 10,
  },
  tableBorderStyle: { borderWidth: 1, borderColor: CLR_SECONDARY.normal },
  tableHeadStyle: { height: 40, backgroundColor: CLR_SECONDARY.light },
  tableTextStyle: { margin: 6 },
});

export default RecipeDetails;
