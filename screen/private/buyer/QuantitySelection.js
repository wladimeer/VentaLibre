import { SafeAreaView, View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';

const QuantitySelection = ({ route, navigation }) => {
  const { user, product, commerce } = route.params;
  const [purchase, setPurchase] = useState({
    quantity: 1,
    totalPrice: 1 * product.price,
    unityPrice: product.price
  });

  return (
    <SafeAreaView>
      <View>
        <Pressable
          onPress={() => {
            navigation.replace('BuyerScreens');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Selecciona Cantidad</Text>
      </View>

      <View>
        <View>
          <Text>Producto:</Text>
          <Text>{product.name}</Text>
        </View>
        <View>
          <Text>Cantidad:</Text>
          <Text>{purchase.quantity}</Text>
        </View>
        <View>
          <Text>Precio Unidad:</Text>
          <Text>${purchase.unityPrice}</Text>
        </View>
        <View>
          <Text>Precio Total:</Text>
          <Text>${purchase.totalPrice}</Text>
        </View>
      </View>

      <View>
        <Pressable
          onPress={() => {
            const { quantity } = purchase;

            if (quantity < product.quantity) {
              setPurchase({
                quantity: quantity + 1,
                totalPrice: (quantity + 1) * product.price,
                unityPrice: product.price
              });
            }
          }}
        >
          <Text>AGREGAR</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            const { quantity } = purchase;

            if (quantity > 1) {
              setPurchase({
                quantity: quantity - 1,
                totalPrice: (quantity - 1) * product.price,
                unityPrice: product.price
              });
            }
          }}
        >
          <Text>QUITAR</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => {
          navigation.navigate('PurchaseVerification', {
            user: user,
            commerce: commerce,
            purchase: purchase,
            product: product
          });
        }}
      >
        <Text>CONTINUAR COMPRA</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default QuantitySelection;
