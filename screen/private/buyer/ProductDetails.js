import {
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, Card } from 'react-native-elements';
import AlertPro from 'react-native-alert-pro';
import React, { useRef, useState, useEffect } from 'react';
import Firebase from '../../../service/Firebase';
import { Linking } from 'react-native';

const ProductDetails = ({ route, navigation }) => {
  const { product, user, rating } = route.params;
  const { width, height } = Dimensions.get('screen');

  return (
    <SafeAreaView>
      <StatusBar animated={true} backgroundColor="#000000" />

      <View>
        <Pressable
          onPress={() => {
            navigation.replace('BuyerScreens');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Detalle del Producto</Text>
      </View>

      <View>
        <Text>{product.name}</Text>
        <Text>${product.price}</Text>
      </View>

      <View>
        <Card containerStyle={{ borderRadius: 5, padding: 0 }}>
          <FlatList
            horizontal
            pagingEnabled
            style={{ width: width, height: 200 }}
            data={product.photos}
            keyExtractor={(item) => item.url}
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
                    navigation.navigate('FullScreen', { photos: product.photos });
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
        <Text>{product.description}</Text>
        <View>
          <Text>Publicación:</Text>
          <Text>{product.creationDate}</Text>
        </View>
        <View>
          <Text>Estado:</Text>
          <Text>{product.state}</Text>
        </View>
        <View>
          <Text>Cantidad:</Text>
          <Text>{product.quantity}</Text>
        </View>

        <View>
          <Text>Vendedor:</Text>
          <Text>{user.name}</Text>
        </View>
        <View>
          <Text>Celular:</Text>
          <Text>{user.cellphone}</Text>
        </View>
        <View>
          <Text>Valoración:</Text>
          <Text>{user.rating}</Text>
        </View>
      </View>

      <View>
        {product.quantity > 0 ? (
          <Pressable
            onPress={() => {
              const code = 597055555532;
              const key =
                '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';

              navigation.navigate('QuantitySelection', {
                user: user,
                product: product,
                commerce: {
                  code: code,
                  key: key
                }
              });
            }}
          >
            <Text>COMPRAR</Text>
          </Pressable>
        ) : (
          <Pressable disabled>
            <Text>COMPRAR</Text>
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            Linking.openURL(
              'whatsapp://send?text=' +
                'Mensaje' +
                '&phone=56' +
                String(user.cellphone)
            );
          }}
        >
          <Text>MENSAJE</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
