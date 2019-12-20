import firebase from 'firebase';
import uuidv1 from 'uuid/v1';

//FUNCIONES PROPIAS DE FIREBASE STORAGE

function uploadFile(file, setFileUploadPercent) {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref().child(`colecciones_de_usuarios/${uuidv1()}-${file.name}`);

    const uploadTask = storageRef.put(file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPercent(`${progress.toFixed(2)}%`);
      },
      (error) => {
        reject('error subiendo archivo');
      },
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        resolve(downloadURL);
      }
    );
  });
}

export default uploadFile;