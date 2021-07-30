import { StyleSheet, View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import PriceFormat from 'price-text-format';
import React, { useState } from 'react';

const QuantitySelection = ({ route, navigation }) => {
  const { user, product, commerce } = route.params;

  const [purchase, setPurchase] = useState({
    quantity: 1,
    totalPrice: 1 * product.price,
    unityPrice: product.price
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.replace('BuyerScreens');
          }}
        >
          <Ionicons
            size={24}
            style={styles.iconsButton}
            name="arrow-back"
            color="black"
          />
        </Pressable>
        <Text style={styles.textTitle}>Selecciona Cantidad</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <View style={{ marginTop: 12 }}>
        <View style={{ marginHorizontal: 5 }}>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Producto:</Text>
            <Text style={styles.textValue}>{product.name}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Cantidad:</Text>
            <Text style={styles.textValue}>
              {purchase.quantity}/{product.quantity}
            </Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Precio Unidad:</Text>
            <Text style={styles.textValue}>${PriceFormat(purchase.unityPrice)}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Precio Total:</Text>
            <Text style={styles.textValue}>${PriceFormat(purchase.totalPrice)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
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
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#957765' : '#A17E68' },
            styles.button
          ]}
        >
          <Text style={styles.textButton}>AGREGAR</Text>
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
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#957765' : '#A17E68' },
            styles.button
          ]}
        >
          <Text style={styles.textButton}>QUITAR</Text>
        </Pressable>
      </View>

      <View style={{ marginHorizontal: 5 }}>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#957765' : '#A17E68' },
            styles.largeButton
          ]}
          onPress={() => {
            navigation.navigate('PurchaseVerification', {
              user: user,
              commerce: commerce,
              purchase: purchase,
              product: product
            });
          }}
        >
          <Text style={styles.textButton}>CONTINUAR COMPRA</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12
  },
  iconsButton: {
    borderColor: '#F2F2F2',
    textAlignVertical: 'bottom',
    borderWidth: 1
  },
  textTitle: {
    fontSize: 22,
    borderWidth: 1,
    textAlignVertical: 'top',
    fontFamily: 'Quicksand-Regular',
    borderColor: '#F2F2F2',
    marginLeft: 20
  },
  divider: {
    width: '100%',
    backgroundColor: '#787373',
    borderWidth: 0.3,
    marginTop: 0
  },
  textLabel: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    color: '#202020'
  },
  textValue: {
    fontSize: 15,
    fontFamily: 'Quicksand-Regular',
    color: '#626262'
  },
  textGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5
  },
  button: {
    width: '45%',
    borderRadius: 2,
    minWidth: 120,
    marginTop: 30,
    padding: 9
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'Quicksand-Regular',
    textAlignVertical: 'top',
    textAlign: 'center',
    fontSize: 15
  },
  largeButton: {
    width: '100%',
    borderRadius: 2,
    marginBottom: 20,
    marginTop: 15,
    padding: 9
  }
});

export default QuantitySelection;
