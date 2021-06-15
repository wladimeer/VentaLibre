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
import React, { useRef, useState } from 'react';
import Firebase from '../../../service/Firebase';

const PurchaseDetails = ({ route, navigation }) => {
  const { purchase } = route.params;
  const { width, height } = Dimensions.get('screen');

  return (
    <SafeAreaView>
      <StatusBar animated={true} backgroundColor="#000000" />

      <View>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Detalle de Compra</Text>
      </View>

      <View>
        <Card containerStyle={{ borderRadius: 5, padding: 0 }}>
          <FlatList
            horizontal
            pagingEnabled
            style={{ width: width, height: 200 }}
            data={purchase.product.photos}
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
                    navigation.navigate('FullScreen', {
                      photos: purchase.product.photos
                    });
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
        <View>
          <Text>Vendedor:</Text>
          <Text>{purchase.seller.name}</Text>
        </View>
        <View>
          <Text>Correo:</Text>
          <Text>{purchase.seller.email}</Text>
        </View>
        <View>
          <Text>Producto:</Text>
          <Text>{purchase.product.name}</Text>
        </View>
        <View>
          <Text>Estado:</Text>
          <Text>{purchase.product.state}</Text>
        </View>
        <View>
          <Text>Cantidad:</Text>
          <Text>{purchase.quantity}</Text>
        </View>
        <View>
          <Text>Precio Unidad:</Text>
          <Text>${purchase.product.price}</Text>
        </View>
        <View>
          <Text>Precio Total:</Text>
          <Text>${purchase.totalPrice}</Text>
        </View>
        <View>
          <Text>Venta:</Text>
          <Text>{purchase.buyDate}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PurchaseDetails;
