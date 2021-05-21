import {
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, Card } from 'react-native-elements';
import React from 'react';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;
  const { width, height } = Dimensions.get('screen');

  return (
    <View>
      <StatusBar animated={true} hidden={false} backgroundColor="#000000" />
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate('ViewProducts');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Detalle del Producto</Text>
      </View>

      <View>
        <Text>{product && product.nombre}</Text>
        <Text>${product && product.precio}</Text>
      </View>

      <View>
        <Card containerStyle={{ borderRadius: 5, padding: 0 }}>
          <FlatList
            horizontal
            pagingEnabled
            style={{ width: width, height: 200 }}
            data={product.fotos}
            keyExtractor={(index) => index.id.toString()}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={{
                    width: width,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5
                  }}
                  onPress={() => {
                    navigation.navigate('FullScreen', { fotos: product.fotos });
                  }}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={{
                      width: width,
                      height: height,
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5
                    }}
                    PlaceholderContent={<ActivityIndicator />}
                    resizeMode={'contain'}
                  />
                </Pressable>
              );
            }}
          />
        </Card>
      </View>

      <View>
        <Text>{product && product.descripcion}</Text>
        <View>
          <Text>Publicación:</Text>
          <Text>{product && product.publicacion}</Text>
        </View>
        <View>
          <Text>Estado:</Text>
          <Text>{product && product.estado}</Text>
        </View>
        <View>
          <Text>Cantidad:</Text>
          <Text>{product && product.cantidad}</Text>
        </View>
      </View>

      <View>
        <Pressable
          onPress={() => {
            console.log('actualizar', product.id);
          }}
        >
          <Text>ACTUALIZAR</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log('eliminar', product.id);
          }}
        >
          <Text>ELIMINAR</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductDetails;
