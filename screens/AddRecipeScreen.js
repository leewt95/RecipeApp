import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  Content,
  Container,
  Form,
  Item,
  Label,
  Input,
  Textarea,
  Icon,
  Button,
} from 'native-base';
import Realm from 'realm';
import { RecipeSchema } from '../database/recipeSchemas';

const AddRecipeScreen = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <Form style={{marginEnd: 15}}>
          <Item stackedLabel>
            <Label>Name</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Instructions</Label>
            <Textarea style={{width: '100%'}} rowSpan={5} bordered placeholder="1. ...."/>
          </Item>
          <Item stackedLabel>
            <Label>Ingredient 1</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Ingredient 2</Label>
            <Input />
          </Item>
          <Item stackedLabel>
            <Label>Ingredient 3</Label>
            <Input />
          </Item>
        </Form>
      </Content>
    </Container>
  );
};

export default AddRecipeScreen;
