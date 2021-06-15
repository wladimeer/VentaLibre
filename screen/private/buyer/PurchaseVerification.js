import { SafeAreaView, View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const PurchaseVerification = ({ route, navigation }) => {
  const { user, purchase, commerce, product } = route.params;

  return (
    <SafeAreaView>
      <View>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Confirma tu Compra</Text>
      </View>

      <View>
        <View>
          <Text>Vendedor:</Text>
          <Text>{user.name}</Text>
        </View>
        <View>
          <Text>Celular:</Text>
          <Text>{user.cellphone}</Text>
        </View>
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

      <Pressable
        onPress={() => {
          navigation.navigate('RealizePurchase', {
            user: user,
            commerce: commerce,
            purchase: purchase,
            product: product
          });
        }}
      >
        <Text>COMPRAR PRODUCTO</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PurchaseVerification;
