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

const CreateUser = (object) => {
  return new Promise((resolve, reject) => {
    fireauth()
      .createUserWithEmailAndPassword(object.email, object.password)
      .then((response) => {
        object.registerDate = moment().format('DD-MM-YYYY');
        (object.password = null), (object.uid = uid(32));

        firedata()
          .ref('usuarios')
          .push()
          .set({
            id: object.uid,
            nombre: object.name,
            direccion: object.address,
            rut: object.rut.toUpperCase(),
            celular: Number.parseInt(object.cellphone),
            fecha_registro: object.registerDate,
            comuna: object.commune,
            region: object.region,
            correo: object.email,
            tipo: object.type
          });

        resolve(object.type);
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

const LoginUser = (object) => {
  return new Promise((resolve, reject) => {
    fireauth()
      .signInWithEmailAndPassword(object.email, object.password)
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
        resolve({
          uid: response.id,
          name: response.nombre,
          address: response.direccion,
          rut: response.rut,
          cellphone: response.celular,
          registerDate: response.fecha_registro,
          commune: response.comuna,
          region: response.region,
          email: response.correo,
          type: response.tipo
        });
      });
    }
  });
};

const CreateProduct = (object) => {
  return new Promise((resolve, reject) => {
    CurrentUser().then((response) => {
      CreateGallery(response, object.photos).then((photos) => {
        firedata()
          .ref('productos/' + response.uid)
          .push()
          .set({
            nombre: object.name.trim(),
            descripcion: object.description.trim(),
            fecha_creacion: moment().format('DD-MM-YYYY'),
            cantidad: Number(object.quantity),
            estado: object.state.trim(),
            precio: Number(object.price),
            categoria: object.category,
            fotos: photos
          })
          .then((response) => {
            resolve('Producto publicado!');
          })
          .catch((response) => {
            reject('Hubo un error al publicar!');
          });
      });
    });
  });
};

const ReadProduct = () => {
  return new Promise((resolve, reject) => {
    const array = [];

    FindProducts()
      .then((products) => {
        products.forEach((product) => {
          array.push({
            id: product.key,
            name: product.val().nombre,
            state: product.val().estado,
            quantity: product.val().cantidad,
            description: product.val().descripcion,
            creation: product.val().fecha_creacion,
            category: product.val().categoria,
            photos: product.val().fotos,
            price: product.val().precio
          });
        });

        resolve(array);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

// /**
//  * Esta función actualiza un producto recibiendo como parametro el id de este.
//  * @param {String} code El cógigo que se recibe representa el id del producto a actualizar.
//  * @returns {String} Retorna una cadena de texto en la que se indica la respuesta.
//  */

const UpdateProduct = (object) => {
  return new Promise((resolve, reject) => {
    FindProducts()
      .then((products) => {
        products.forEach((product) => {
          if (product.key == object.id) {
            product.ref.update({
              nombre: object.name.trim(),
              cantidad: Number(object.quantity),
              precio: Number(object.price)
            });

            resolve('Producto actualizado!');
          }
        });
      })
      .catch((response) => {
        reject('Hubo un error al actualizar!');
      });
  });
};

const DeleteProduct = (code) => {
  return new Promise((resolve, reject) => {
    FindProducts().then((products) => {
      products.forEach((product) => {
        if (product.key == code) {
          product.ref
            .remove()
            .then((response) => {
              resolve('Producto eliminado!');
            })
            .catch((response) => {
              reject('Hubo un error al eliminar!');
            });
        }
      });
    });
  });
};

const FindProducts = () => {
  return new Promise((resolve, reject) => {
    CurrentUser()
      .then((user) => {
        firedata()
          .ref('productos')
          .on('value', (response) => {
            response.forEach((products) => {
              if (user.uid == products.key) {
                resolve(products);
              }
            });
          });
      })
      .catch((response) => {
        reject(response);
      });
  });
};

const SearchProducts = (name) => {
  return new Promise((resolve, reject) => {
    const array = [];

    FindProducts()
      .then((products) => {
        products.forEach((product) => {
          if (product.val().nombre.toLowerCase().startsWith(name.toLowerCase())) {
            array.push({
              id: product.key,
              name: product.val().nombre,
              state: product.val().estado,
              quantity: product.val().cantidad,
              description: product.val().descripcion,
              creation: product.val().fecha_creacion,
              category: product.val().categoria,
              photos: product.val().fotos,
              price: product.val().precio
            });
          }
        });

        resolve(array);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

const FilterProducts = (category) => {
  return new Promise((resolve, reject) => {
    const array = [];

    FindProducts()
      .then((products) => {
        products.forEach((product) => {
          if (product.val().categoria == category) {
            array.push({
              id: product.key,
              name: product.val().nombre,
              state: product.val().estado,
              quantity: product.val().cantidad,
              description: product.val().descripcion,
              creation: product.val().fecha_creacion,
              category: product.val().categoria,
              photos: product.val().fotos,
              price: product.val().precio
            });
          }

          resolve(array);
        });
      })
      .catch((response) => {
        reject(response);
      });
  });
};

const CreateGallery = (user, photos) => {
  return new Promise((resolve, reject) => {
    const array = [];

    photos.forEach(async (value) => {
      const response = await fetch(value);
      const photo = await response.blob();

      storage()
        .ref()
        .child(user.uid + '/' + uid(32))
        .put(photo)
        .then((response) => {
          response.ref.getDownloadURL().then((url) => {
            array.push({
              fecha_creacion: moment().format('DD-MM-YYYY'),
              url: url
            });

            if (array.length == photos.length) {
              resolve(array);
            }
          });
        })
        .catch((response) => {
          reject(response);
        });
    });
  });
};

export default {
  CreateUser,
  LoginUser,
  LogoutUser,
  CurrentUser,
  CreateProduct,
  ReadProduct,
  DeleteProduct,
  UpdateProduct,
  SearchProducts,
  FilterProducts
};
