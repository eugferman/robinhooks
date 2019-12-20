/* eslint-disable no-undef */
import firebase from 'firebase';
import {
 getItem, deleteItem, deleteTwoItem, addItemWithId, addTwoItemWithId, getAll 
} from './database';
import 'firebase/firestore';
import config from '../config';

firebase.initializeApp(config.firebaseConfig);


describe('API - crud testing', () => {
  it('API - testing adding item with id', async () => {
    const collection = 'comentarios-test';
    const item = {
      coleccionID: 'test-id',
      comentario: 'test-comentario',
      timestamp: 1576170789305,
      user: 'test-user'
    };
    const id = '1234';
    const result = await addItemWithId(collection, item, id);
    expect(!!result).toBe(true);
  });

  it('API - get item', async () => {
    const collection = 'comentarios-test';
    const itemId = '1234';
    const result = await getItem(collection, itemId);
    expect(!!result).toBe(true);
  });
  it('API - delete item', async () => {
    const collection = 'comentarios-test';
    const itemId = '1234';
    const result = await deleteItem(collection, itemId);
    expect(!!result).toBe(true);
  });
});

describe('API - crud testing with 2 items', () => {
  it('API - testing adding 2 items with id', async () => {
    const collection = 'comentarios-test';
    const item = {
      coleccionID: 'test-id-1',
      comentario: 'test-comentario-1',
      timestamp: 1576170789305,
      user: 'test-user'
    };
    const id = '1234';
    const item2 = {
      coleccionID: 'test-id-2',
      comentario: 'test-comentario-2',
      timestamp: 1576170789305,
      user: 'test-user'
    };
    const id2 = '5678';
    const result = await addTwoItemWithId(collection, item, item2, id, id2);
    expect(!!result).toBe(true);
  });
  it('API - get all item', async () => {
    const collection = 'comentarios-test';
    const result = await getAll(collection);
    expect(!!result).toBe(true);
  });

  it('API - get length collection', async () => {
    const collection = 'comentarios-test';
    const resultado = await getAll(collection);
    const data = resultado.length;
    expect(data).toBe(2);
  });

  it('API - delete two item', async () => {
    const collection = 'comentarios-test';
    const itemId = '1234';
    const itemId2 = '5678';
    const result = await deleteTwoItem(collection, itemId, itemId2);
    expect(!!result).toBe(true);
  });
});
