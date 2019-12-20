import firebase from 'firebase';
import 'firebase/firestore';

// FUNCIONES PROPIAS DE FIREBSE DATABASE FIRESTORE

function parseDoc(doc) {
  return {
    id: doc.id,
    ...doc.data()
  };
}

let db;
function getDbInstance() {
  if (!db || db._isTerminated) {
    db = firebase.firestore();
  }
  return db;
}

async function getAll(collection) {
  const db = getDbInstance();
  const collectionData = await db.collection(collection).get();

  const results = [];
  collectionData.forEach((document) => {
    results.push(parseDoc(document));
  });

  return results;
}


async function getAllRealTime({ collection, filters, order, callback }) {
  let dataAll = getDbInstance();
  dataAll = dataAll.collection(collection);
  if (filters) {
    dataAll = dataAll.where(filters.field, filters.condition, filters.value);
  }
  if (order) {
    dataAll = dataAll.orderBy(order);
  }
  dataAll.onSnapshot(callback);
}

async function addItem(collection, item) {
  const db = getDbInstance();
  const result = await db.collection(collection).add(item);
  return !!result.id;
}

async function addItemWithId(collection, item, id) {
  db = getDbInstance();
  const result = await db.collection(collection).doc(id).set(item);
  return !result;
}

async function addTwoItemWithId(collection, item, item2, id, id2) {
  const db = getDbInstance();
  const result = await db.collection(collection).doc(id).set(item);
  const result2 = await db.collection(collection).doc(id2).set(item2);
  return !result || !result2;
}

async function getItem(collection, itemId) {
  const db = getDbInstance();
  const document = await db.collection(collection).doc(itemId).get();

  if (document.exists) {
    return parseDoc(document);
  }
  return null;
}

async function deleteItem(collection, itemId) {
  const db = getDbInstance();
  const result = await db.collection(collection).doc(itemId).delete();
  return !result;
}

async function deleteTwoItem(collection, itemId, itemId2) {
  const db = getDbInstance();
  const result = await db.collection(collection).doc(itemId).delete();
  const result2 = await db.collection(collection).doc(itemId2).delete();
  return !result || !result2;
}

async function updateItemDescripcion(collection, itemId, value) {
  const db = getDbInstance();
  const result = await db.collection(collection).doc(itemId).update({ descripcion: value });
  return !result;
}

async function updateItemImagen(collection, itemId, value) {
  const db = getDbInstance();
  const result = await db.collection(collection).doc(itemId).update({ collectionpath: value });
  return !result;
}

async function updateCollectionItemImagen(collection, itemId, value) {
  const db = getDbInstance();
  const result = await db.collection(collection).doc(itemId).update({ collectionImages: value });
  return !result;
}

export {
  getDbInstance,
  getAll,
  addItem,
  getItem,
  getAllRealTime,
  deleteItem,
  deleteTwoItem,
  addItemWithId,
  addTwoItemWithId,
  updateItemDescripcion,
  updateItemImagen,
  updateCollectionItemImagen
};
