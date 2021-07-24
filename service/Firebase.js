import RutValidator from 'w2-rut-validator';
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

const ratingReference = firedata().ref('ratings');
const purchaseReference = firedata().ref('purchases');
const productReference = firedata().ref('products');
const userReference = firedata().ref('users');

/**
 * Método que sirve para registrar un usuario en firebase
 * @param {*} object Recibe los datos del usuario en un objeto json
 * @returns Retorna el tipo de usuario si se registra correctamente y un mensaje si hay un error
 */

const CreateUser = (object) => {
  return new Promise((resolve, reject) => {
    fireauth()
      .createUserWithEmailAndPassword(object.email, object.password)
      .then((response) => {
        (object.password = null), (object.uid = uid(32));
        object.rut = RutValidator.format(object.rut.toUpperCase());
        object.registerDate = moment().format('DD-MM-YYYY');

        userReference.push().set(object);
        resolve(object.type);
      })
      .catch((response) => {
        switch (response.code) {
          case 'auth/invalid-email':
            reject('Verifica el Correo Ingresado!');
            break;
          case 'auth/email-already-exists':
            reject('El Correo Ingresado ya Existe!');
            break;
          case 'auth/weak-password':
            reject('La Contraseña es Muy Corta!');
            break;
          case 'auth/email-already-in-use':
            reject('El Correo se Está Utilizando!');
            break;
          default:
            reject('Firebase Dejo de Funcionar!');
            break;
        }
      });
  });
};

/**
 * Método que sirve para iniciar sesión en el sistema
 * @param {*} object Recibe el correo y la contraseña dentro de un objeto json
 * @returns Retorna el tipo de usuario si inicia sesión correctamente y un mensaje si hay un error
 */

const LoginUser = (object) => {
  return new Promise((resolve, reject) => {
    fireauth()
      .signInWithEmailAndPassword(object.email, object.password)
      .then((response) => {
        SearchUser(response.user.email).then((values) => {
          resolve(values.type);
        });
      })
      .catch((response) => {
        switch (response.code) {
          case 'auth/invalid-email':
            reject('Verifica el Correo Ingresado!');
            break;
          case 'auth/wrong-password':
            reject('La Contraseña no Coincide!');
            break;
          case 'auth/user-not-found':
            reject('El Usuario Ingresado no Existe!');
            break;
          case 'auth/too-many-requests':
            reject('Demasiados Intentos Fallidos!');
            break;
          default:
            reject('Firebase Dejo de Funcionar!');
            break;
        }
      });
  });
};

/**
 * Método que sirve para buscar un usuario vendedor
 * @param {*} value Recibe el uid del usuario vendedor
 * @returns Retorna el usuario mas la calificación si posee
 */

const FindUser = (value) => {
  return new Promise((resolve, reject) => {
    userReference.on('value', (snapshot) => {
      snapshot.forEach((response) => {
        if (response.val().uid == value) {
          SearchRating(response.val()).then((values) => {
            resolve(Object.assign(response.val(), { rating: values }));
          });
        }
      });
    });
  });
};

/**
 * Método que sirve para buscar un usuario en la base de datos
 * @param {*} value Recibe el correo del usuario a buscar
 * @returns Retorna los datos del usuario en un objeto json si existe
 */

const SearchUser = (value) => {
  return new Promise((resolve, reject) => {
    userReference.on('value', (response) => {
      response.forEach((values) => {
        if (values.val().email.toLowerCase() == value.toLowerCase()) {
          resolve(values.val());
        }
      });
    });
  });
};

/**
 * Método que sirve para obtener los datos del usuario que inicio sesión
 * @returns Retorna los datos del usuario actual en un objeto json
 */

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

/**
 * Método que sirve para cerrar sesión en el sistema
 */

const LogoutUser = () => {
  firebase.auth().signOut();
};

/**
 * Método que sirve para registrar un producto en firebase
 * @param {*} object Recibe los datos del producto en un objeto json
 * @returns Retorna un mensaje indicando el resultado obtenido
 */

const CreateProduct = (object) => {
  return new Promise((resolve, reject) => {
    CurrentUser().then((response) => {
      CreateGallery(response, object.photos)
        .then((values) => {
          firedata()
            .ref('products/' + response.uid)
            .push()
            .set({
              name: object.name.trim(),
              state: object.state.trim(),
              description: object.description.trim(),
              creationDate: moment().format('DD-MM-YYYY'),
              quantity: Number(object.quantity),
              price: Number(object.price),
              category: object.category,
              photos: values
            })
            .then((response) => {
              resolve('Producto Publicado!');
            })
            .catch((response) => {
              reject('Hubo un Error al Publicar!');
            });
        })
        .catch((response) => {
          reject('Hubo un Error al Publicar!');
        });
    });
  });
};

/**
 * Método que sirve para obtener todos los productos publicados
 * @returns Retorna todos los productos publicados
 */

const ReadProducts = () => {
  return new Promise((resolve, reject) => {
    const array = [];

    FindProducts().then((response) => {
      response.forEach((values) => {
        array.push(Object.assign(values.val(), { uid: values.key }));
      });

      resolve(array);
    });
  });
};

/**
 * Método que sirve para actualizar los datos de un producto especifico
 * @param {*} object Recibe los datos del producto a actualizar en un objeto json
 * @returns Retorna un mensaje indicando el resultado obtenido
 */

const UpdateProduct = (object) => {
  return new Promise((resolve, reject) => {
    FindProducts().then((response) => {
      let reference = null;

      response.forEach((values) => {
        if (values.key == object.uid) {
          reference = values.ref;
        }
      });

      if (reference != null) {
        reference
          .update({
            name: object.name.trim(),
            quantity: Number(object.quantity),
            price: Number(object.price)
          })
          .then((response) => {
            resolve('Producto Actualizado!');
          })
          .catch((response) => {
            reject('Hubo un Error al Actualizar!');
          });
      }
    });
  });
};

/**
 * Método que sirve para eliminar un producto de la base de datos
 * @param {*} code Recibe el uid del producto a eliminar
 * @returns Retorna un mensaje indicando el resultado obtenido
 */

const DeleteProduct = (code) => {
  return new Promise((resolve, reject) => {
    FindProducts().then((response) => {
      let reference = null;

      response.forEach((values) => {
        if (values.key == code) {
          reference = values.ref;
        }
      });

      if (reference != null) {
        reference
          .remove()
          .then(() => {
            resolve('Producto Eliminado!');
          })
          .catch(() => {
            reject('Hubo un Error al Eliminar!');
          });
      }
    });
  });
};

/**
 * Método que sirve para actualizar la cantidad de un producto especifico
 * @param {*} object Recibe los datos del producto al cual se le modificara la cantidad
 * @param {*} quantity Recibe una cantidad de tipo number
 * @returns Retorna el producto en un objeto json si se actualizo correctamente y null si no
 */

const UpdateProductQuantity = (object, quantity) => {
  return new Promise((resolve, reject) => {
    productReference.on('value', (response) => {
      let reference = null;

      response.forEach((products) => {
        products.forEach((values) => {
          if (values.key == object.uid) {
            reference = values.ref;
          }
        });
      });

      if (reference != null) {
        object.quantity -= quantity;
        object.user = null;
        object.uid = null;

        reference
          .update({ quantity: object.quantity })
          .then(() => {
            resolve(object);
          })
          .catch(() => {
            reject(null);
          });
      }
    });
  });
};

/**
 * Método que sirve para obtener todos los productos publicados junto al usuario
 * @returns Retorna un arreglo de productos junto al usuario que lo publico
 */

const FindAllProducts = () => {
  return new Promise((resolve, reject) => {
    const array = [];

    productReference.on('value', (snapshot) => {
      snapshot.forEach((response) => {
        response.forEach((values) => {
          array.push(
            Object.assign(values.val(), {
              user: response.key,
              uid: values.key
            })
          );
        });

        resolve(array);
      });
    });
  });
};

/**
 * Método que sirve para obtener los productos del usuario que inicio sesión
 * @returns Retorna todos los productos publicados por el usuario actual
 */

const FindProducts = () => {
  return new Promise((resolve, reject) => {
    CurrentUser().then((user) => {
      productReference.on('value', (response) => {
        response.forEach((values) => {
          if (user.uid == values.key) {
            resolve(values);
          }
        });
      });
    });
  });
};

/**
 * Método que sirve para obtener todos los productos que empiecen con el nombre, para el comprador
 * @param {*} name Recibe el nombre del producto a buscar
 * @returns Retorna todos los productos que coinciden con el nombre unto al usuario
 */

const SearchAllProducts = (name) => {
  return new Promise((resolve, reject) => {
    const array = [];

    productReference.on('value', (snapshot) => {
      snapshot.forEach((response) => {
        response.forEach((values) => {
          if (values.val().name.toLowerCase().startsWith(name.toLowerCase())) {
            array.push(
              Object.assign(values.val(), {
                user: response.key,
                uid: values.key
              })
            );
          }
        });
      });

      resolve(array);
    });
  });
};

/**
 * Método que sirve para obtener todos los productos que empiecen con el nombre, para el vendedor
 * @param {*} name Recibe el nombre del producto a buscar
 * @returns Retorna todos los productos que coinciden con el nombre
 */

const SearchProducts = (name) => {
  return new Promise((resolve, reject) => {
    const array = [];

    FindProducts().then((response) => {
      response.forEach((values) => {
        if (values.val().name.toLowerCase().startsWith(name.toLowerCase())) {
          array.push(Object.assign(values.val(), { uid: values.key }));
        }
      });

      resolve(array);
    });
  });
};

/**
 * Método que sirve para filtrar por categoría, para el comprador
 * @param {*} category Recibe la categoría del producto a filtrar
 * @returns Retorna todos los productos que coinciden con la categoría
 */

const FilterAllProducts = (category) => {
  return new Promise((resolve, reject) => {
    const array = [];

    productReference.on('value', (response) => {
      response.forEach((values) => {
        FindUser(values.key).then((user) => {
          SearchRating(user).then((rating) => {
            values.forEach((product) => {
              if (product.val().category == category) {
                array.push(
                  Object.assign(product.val(), {
                    rating: rating,
                    uid: product.key,
                    user: user
                  })
                );
              }
            });

            resolve(array);
          });
        });
      });
    });
  });
};

/**
 * Método que sirve para filtrar por categoría, para el vendedor
 * @param {*} category Recibe la categoría del producto a filtrar
 * @returns Retorna todos los productos que coinciden con la categoría
 */

const FilterProducts = (category) => {
  return new Promise((resolve, reject) => {
    const array = [];

    FindProducts().then((response) => {
      response.forEach((values) => {
        if (values.val().category == category) {
          array.push(Object.assign(values.val(), { uid: values.key }));
        }

        resolve(array);
      });
    });
  });
};

/**
 * Método que sirve para publicar fotos en storage de firebase
 * @param {*} user Recibe el usuario que realiza la publicación
 * @param {*} photos Recibe las fotos que desea publicar
 * @returns Retorna un arreglo con las fotos publicadas si se subieron correctamente si no retirna error
 */

const CreateGallery = (user, photos) => {
  return new Promise((resolve, reject) => {
    const array = [];

    photos.forEach(async (value) => {
      const response = await fetch(value);
      const creation = moment().format('DD-MM-YYYY');
      const photo = await response.blob();

      storage()
        .ref()
        .child(user.uid + '/' + uid(32))
        .put(photo)
        .then((response) => {
          response.ref.getDownloadURL().then((url) => {
            array.push({ creationDate: creation, url: url });

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

/**
 * Método que sirve para registrar una compra realizada
 * @param {*} object Recibe los datos de la compra, el comprador, el vendedor, el precio total y la cantidad en un objeto json
 * @returns Retorna un mensaje indicando el resultado obtenido
 */

const CreatePurchase = (object) => {
  return new Promise((resolve, reject) => {
    CurrentUser().then((user) => {
      UpdateProductQuantity(object.product, object.quantity)
        .then((response) => {
          object.seller.rating = null;

          purchaseReference
            .push()
            .set({
              product: response,
              buyDate: moment().format('DD-MM-YYYY'),
              totalPrice: object.totalPrice,
              quantity: object.quantity,
              seller: object.seller,
              buyer: user
            })
            .then((response) => {
              resolve('Producto Comprado!');
            });
        })
        .catch((response) => {
          reject('Hubo un Error al Comprar!');
        });
    });
  });
};

/**
 * Método que sirve para obtener las compras registradas
 * @returns Retorna las compras dependiendo del tipo de usuario que inicio sesión
 */

const ReadPurchases = () => {
  return new Promise((resolve, reject) => {
    CurrentUser().then((user) => {
      switch (user.type) {
        case 'Vendedor':
          purchaseReference.on('value', (response) => {
            const array = [];

            response.forEach((values) => {
              if (values.val().seller.uid == user.uid) {
                array.push(values.val());
              }
            });

            resolve(array);
          });
          break;
        case 'Comprador':
          purchaseReference.on('value', (response) => {
            const array = [];

            response.forEach((values) => {
              if (values.val().buyer.uid == user.uid) {
                array.push(values.val());
              }
            });

            resolve(array);
          });
          break;
      }
    });
  });
};

/**
 * Método que sirve para calificar a un vendedor después de la compra
 * @param {*} object Recibe el vendedor y la calificación en un objeto json
 * @returns Retorna un mensaje indicando el resultado obtenido
 */

const ValorateSeller = (object) => {
  return new Promise((reject, resolve) => {
    CurrentUser().then((response) => {
      firedata()
        .ref('ratings/' + object.seller.uid)
        .push()
        .set({
          rating: Number(object.rating),
          buyer: response
        })
        .then((response) => {
          resolve('Gracias Por Comprar!');
        })
        .catch((response) => {
          reject('Hubo un Error al Valorar!');
        });
    });
  });
};

/**
 * Método que sirve para obtener las calificaciónes registradas
 * @returns Retorna las calificaciones realizadas al vendedor
 */

const ReadRatings = () => {
  return new Promise((resolve, reject) => {
    const array = [];

    CurrentUser().then((user) => {
      ratingReference.on('value', (response) => {
        response.forEach((values) => {
          if (values.key == user.uid) {
            values.forEach((rating) => {
              array.push(rating.val());
            });
          }
        });

        resolve(array);
      });
    });
  });
};

/**
 * Método que sirve para conocer la calificación actual de un vendedor
 * @param {*} user Recibe el usuario por el cual se consultara la calificación
 * @returns Retorna la calificación como un mensaje
 */

const SearchRating = (user) => {
  return new Promise((resolve, reject) => {
    ratingReference.on('value', (response) => {
      if (response.exists()) {
        response.forEach((values) => {
          if (values.key == user.uid) {
            let totalRating = 0;
            let accountant = 0;

            values.forEach((rating) => {
              totalRating += rating.val().rating;
              accountant++;
            });

            if (accountant > 5) {
              switch (totalRating / accountant) {
                case 1:
                  resolve('Muy Malas Calificaciónes');
                  break;
                case 2:
                  resolve('Posee Malas Calificaciónes');
                  break;
                case 3:
                  resolve('Es Un Vendedor Promedio');
                  break;
                case 4:
                  resolve('Posee Buenas Calificaciónes');
                  break;
                case 5:
                  resolve('Es Un Excelente Vendedor');
                  break;
              }
            } else resolve('Calificación Insuficiente');
          } else resolve('Sin Calificación');
        });
      } else {
        resolve('Sin Calificación');
      }
    });
  });
};

export default {
  LoginUser,
  LogoutUser,
  CreateUser,
  CurrentUser,
  ReadProducts,
  DeleteProduct,
  CreateProduct,
  UpdateProduct,
  SearchProducts,
  SearchAllProducts,
  FilterAllProducts,
  FindAllProducts,
  ValorateSeller,
  FilterProducts,
  CreatePurchase,
  ReadPurchases,
  SearchRating,
  ReadRatings,
  FindUser
};
