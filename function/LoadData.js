import country from '../assets/api/country.json';

const States = () => {
  return new Promise((resolve, reject) => {
    resolve([
      { key: 'state', value: 'Nuevo' },
      { key: 'state', value: 'Seminuevo' },
      { key: 'state', value: 'Usado' }
    ]);
  });
};

const Categories = () => {
  return new Promise((resolve, reject) => {
    resolve([
      { key: 'category', value: 'Accesorios' },
      { key: 'category', value: 'Calzado' },
      { key: 'category', value: 'Comestibles' },
      { key: 'category', value: 'Deporte y Fitness' },
      { key: 'category', value: 'Electrodomésticos' },
      { key: 'category', value: 'Hogar y Muebles' },
      { key: 'category', value: 'Herramientas' },
      { key: 'category', value: 'Instrumentos Musicales' },
      { key: 'category', value: 'Joyas' },
      { key: 'category', value: 'Juegos y Juguetes' },
      { key: 'category', value: 'Libros, Revistas y Comics' },
      { key: 'category', value: 'Música' },
      { key: 'category', value: 'Moda' },
      { key: 'category', value: 'Películas' },
      { key: 'category', value: 'Relojes' },
      { key: 'category', value: 'Salud' },
      { key: 'category', value: 'Tecnología' },
      { key: 'category', value: 'Vestuario' },
      { key: 'category', value: 'Otro' }
    ]);
  });
};

const Regions = () => {
  return new Promise((resolve, reject) => {
    const array = [];

    country.regions.forEach((region) => {
      array.push({
        value: region.name,
        communes: region.communes,
        key: 'region'
      });
    });

    resolve(array);
  });
};

const Communes = function (name) {
  return new Promise((resolve, reject) => {
    const array = [];

    country.regions.forEach((region) => {
      if (region.name == name) {
        region.communes.forEach((commune) => {
          array.push({
            value: commune.name,
            key: 'commune'
          });
        });

        resolve(array);
      }
    });
  });
};

export default { States, Categories, Regions, Communes };
