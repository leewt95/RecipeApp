import Realm from 'realm';
import { RecipeSchema } from './RecipeSchema';

export const viewDatabase = async () => {
  await Realm.open({
    schema: [RecipeSchema],
  })
    .then((realm) => {
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

export const clearDatabase = async () => {
  await Realm.open({
    schema: [RecipeSchema],
  })
    .then((realm) => {
      realm.write(() => {
        realm.delete(realm.objects('Recipe'));
      });
      realm.close();
      console.log('Database cleared!');
    })
    .catch((e) => {
      console.log(e);
    });
};
