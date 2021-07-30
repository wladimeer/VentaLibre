import { StyleSheet, View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import PriceFormat from 'price-text-format';
import React from 'react';

const PurchaseVerification = ({ route, navigation }) => {
  const { user, purchase, commerce, product } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            size={24}
            style={styles.iconsButton}
            name="arrow-back"
            color="black"
          />
        </Pressable>
        <Text style={styles.textTitle}>Confirma tu Compra</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <View style={{ marginHorizontal: 5 }}>
        <View style={{ marginVertical: 12 }}>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Vendedor:</Text>
            <Text style={styles.textValue}>{user.name}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Celular:</Text>
            <Text style={styles.textValue}>{user.cellphone}</Text>
          </View>
        </View>

        <View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Producto:</Text>
            <Text style={styles.textValue}>{product.name}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Cantidad:</Text>
            <Text style={styles.textValue}>{purchase.quantity}</Text>
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

      <View style={{ marginHorizontal: 5 }}>
        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#957765' : '#A17E68' },
            styles.largeButton
          ]}
          onPress={() => {
            navigation.navigate('RealizePurchase', {
              user: user,
              commerce: commerce,
              purchase: purchase,
              product: product
            });
          }}
        >
          <Text style={styles.textButton}>COMPRAR PRODUCTO</Text>
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
    minWidth: 120,
    marginTop: 30,
    padding: 9
  }
});

export default PurchaseVerification;
