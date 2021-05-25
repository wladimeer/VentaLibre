import firebase from 'firebase/app';
import moment from 'moment';
import 'firebase/database';
import { uid } from 'uid';
import 'firebase/storage';
import 'firebase/auth';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDUrh5yczDZ42JgEaAZTjtmM4V53yh04FE',
    authDomain: 'ventalibre-16620.firebaseapp.com',
    databaseURL: 'https://ventalibre-16620-default-rtdb.firebaseio.com',
    projectId: 'ventalibre-16620',
    storageBucket: 'ventalibre-16620.appspot.com',
    messagingSenderId: '602452979297',
    appId: '1:602452979297:web:aeb325a84b5e2d8663c420'
  });
}

const fireauth = firebase.auth;
const firedata = firebase.database;
const storage = firebase.storage;

const CreateUser = (user) => {
  return new Promise((resolve, reject) => {
    fireauth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        user.registerDate = moment().format('DD-MM-YYYY');
        (user.password = null), (user.uid = uid(32));

        const object = {
          id: user.uid,
          nombre: user.name,
          direccion: user.address,
          rut: user.rut.toUpperCase(),
          celular: Number.parseInt(user.cellphone),
          fecha_registro: user.registerDate,
          comuna: user.commune,
          region: user.region,
          correo: user.email,
          tipo: user.type
        };

        firedata().ref('usuarios').push().set(object);
        console.log(response.user);
      })
      .catch((response) => {
        switch (response.code) {
          case 'auth/invalid-email':
            reject('Verifica el correo ingresado!');
            break;
          case 'auth/email-already-exists':
            reject('El correo ingresado ya existe!');
            break;
          case 'auth/weak-password':
            reject('La contraseña es muy corta!');
            break;
          case 'auth/email-already-in-use':
            reject('El correo se está utilizando!');
            break;
          default:
            reject('Firebase dejo de funcionar!');
            break;
        }
      });
  });
};

const LoginUser = (form) => {
  return new Promise((resolve, reject) => {
    fireauth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((response) => {
        SearchUser(response.user.email).then((response) => {
          resolve(response.tipo);
        });
      })
      .catch((response) => {
        switch (response.code) {
          case 'auth/invalid-email':
            reject('Verifica el correo ingresado!');
            break;
          case 'auth/wrong-password':
            reject('La contraseña no coincide!');
            break;
          case 'auth/user-not-found':
            reject('El usuario ingresado no existe!');
            break;
          case 'auth/too-many-requests':
            reject('Demasiados intentos fallidos!');
            break;
          default:
            reject('Firebase dejo de funcionar!');
            break;
        }
      });
  });
};

const LogoutUser = () => {
  firebase.auth().signOut();
};

const SearchUser = (value) => {
  return new Promise((resolve, reject) => {
    firedata()
      .ref('usuarios')
      .on('value', (response) => {
        response.forEach((user) => {
          if (user.val().correo == value) {
            resolve(user.val());
          }
        });
      });
  });
};

const CurrentUser = () => {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    if (user != null) {
      SearchUser(user.email).then((response) => {
        resolve(response);
      });
    }
  });
};

const GenerateId = () => {
  return new Promise((resolve, reject) => {
    resolve(uid(32));
  });
};

const CreateProduct = (product) => {
  const array = [];

  product.photos.forEach((photo) => {
    // array.push({
    //   ['' + uid(32)]: { fecha_creacion: moment().format('DD-MM-YYYY'), url: photo }
    // });
    // console.log(photo);
    // storage()
    //   .ref('fotos/')
    //   .child('mifoto')
    //   .put(photo)
    //   .then((response) => {
    //     console.log(response);
    //   });
  });

  const path = storage().ref('fotos/').child('mifoto4');
  path.putString(product.photos[0]).then((response) => {
    // console.log(response);
  });

  // path.put(product.photos[0]).then((response) => {
  // console.log(response);
  // });

  console.log(path.bucket + path.fullPath);

  // const object = {
  //   ['' + uid(32)]: {
  //     nombre: product.name,
  //     descripcion: product.description,
  //     fecha_creacion: moment().format('DD-MM-YYYY'),
  //     cantidad: Number(product.quantity),
  //     estado: product.state,
  //     precio: Number(product.price),
  //     categoria: product.category,
  //     fotos: array
  //   }
  // };

  // console.log(object);
};

export default { CreateUser, LoginUser, LogoutUser, CurrentUser, CreateProduct };
