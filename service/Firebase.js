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

const userReference = firedata().ref('users');
const purchaseReference = firedata().ref('purchases');
const productReference = firedata().ref('products');
const ratingReference = firedata().ref('ratings');

const CreateUser = (object) => {
  return new Promise((resolve, reject) => {
    fireauth()
      .createUserWithEmailAndPassword(object.email, object.password)
      .then((response) => {
        object.registerDate = moment().format('DD-MM-YYYY');
        (object.password = null), (object.uid = uid(32));

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

const LogoutUser = () => {
  firebase.auth().signOut();
};

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

// /**
//  * Esta función actualiza un producto recibiendo como parametro el id de este.
//  * @param {String} code El cógigo que se recibe representa el id del producto a actualizar.
//  * @returns {String} Retorna una cadena de texto en la que se indica la respuesta.
//  */

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

const SearchRating = (user) => {
  return new Promise((resolve, reject) => {
    ratingReference.on('value', (response) => {
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
