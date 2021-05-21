import { ActivityIndicator, StatusBar, Dimensions } from 'react-native';
import { SearchBar, Divider, Image, Card, ListItem } from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';

const ViewProducts = ({ navigation }) => {
  const { width, height } = Dimensions.get('screen');
  const [search, setSearch] = useState('');

  const list = [
    {
      id: 1,
      nombre: 'Zapatos de terno para salir',
      fotos: [
        {
          id: 1,
          url: 'https://media.gq.com.mx/photos/5be9eee25c1fcbc0fa4c3ea4/master/pass/traje_zapatos_9270.jpg'
        },
        {
          id: 2,
          url: 'http://www.plantillascoimbra.com/blog/wp-content/uploads/zapatos-para-traje.jpg'
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/originals/cc/e9/63/cce9639cedbe58cd8da161b97d50a817.jpg'
        },
        {
          id: 4,
          url: 'https://arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/AWTFEYWSGBDYZL4TR2QOA44P5I.jpg'
        }
      ],
      precio: 32000,
      publicacion: '01/12/2020',
      descripcion:
        'Estos zapatos son ideales para salir, ya sea a una cita, o quízas con la familia, la calidad de ellos es garantia de que la duración sera por muchos años',
      estado: 'Nuevo',
      cantidad: 25
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <StatusBar animated={true} hidden={false} backgroundColor="#000000" />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Pressable
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <EvilIcons name="navicon" size={30} color="white" />
        </Pressable>

        <Text>VentaLibre</Text>

        <SearchBar
          platform={'android'}
          placeholder="Type Here..."
          onChangeText={setSearch}
          value={search}
        />

        <Pressable
          onPress={() => {
            console.log('filter');
          }}
        >
          <Feather name="filter" size={24} color="white" />
        </Pressable>
      </View>

      {list.map((product, index) => {
        return (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                product: {
                  id: product.id,
                  fotos: product.fotos,
                  nombre: product.nombre,
                  precio: product.precio,
                  descripcion: product.descripcion,
                  publicacion: product.publicacion,
                  cantidad: product.cantidad,
                  estado: product.estado
                }
              })
            }
          >
            <Card containerStyle={{ borderRadius: 5, padding: 0 }}>
              <View key={index}>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    source={{ uri: product.fotos[0].url }}
                    style={{
                      width: width,
                      height: height - 569,
                      borderTopLeftRadius: 3,
                      borderTopRightRadius: 3
                    }}
                    PlaceholderContent={<ActivityIndicator />}
                    resizeMode={'contain'}
                  />
                </View>
                <Text>${product.precio}</Text>
                <Text>{product.nombre}</Text>
              </View>
            </Card>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ViewProducts;
