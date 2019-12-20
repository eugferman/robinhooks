import firebase from 'firebase';

// FUNCIONES PROPIAS DE FIREBASE AUTH

function registerAuth(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => error);
}

async function login(email, password) {
  const result = await firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => error);
  return result;
}

function logout() {
  firebase.auth().signOut();
}

function registerAuthObserver(callback) {
  return firebase.auth().onAuthStateChanged(callback);
}


export {
  registerAuth,
  logout,
  login,
  registerAuthObserver
};
