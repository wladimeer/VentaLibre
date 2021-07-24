import { View, Text, Pressable, FlatList } from 'react-native';
import { Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { Image, Card, Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const { width, height } = Dimensions.get('screen');

const PurchaseDetails = ({ route, navigation }) => {
  const { purchase } = route.params;

  return (
    <View style={styles.container}>
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
        <Text style={styles.textTitle}>Detalle de Compra</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <View style={{ marginVertical: 12 }}>
        <Card containerStyle={styles.card}>
          <FlatList
            horizontal
            pagingEnabled
            data={purchase.product.photos}
            keyExtractor={(item) => item.url}
            style={{ width: width, height: 250 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate('FullScreen', {
                      photos: purchase.product.photos
                    });
                  }}
                  style={styles.boxContent}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={{ width: width, height: height }}
                    PlaceholderContent={
                      <ActivityIndicator size="large" color="#957765" />
                    }
                    resizeMode={'contain'}
                  />
                </Pressable>
              );
            }}
          />
        </Card>
      </View>

      <View style={{ marginHorizontal: 5 }}>
        <View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Vendedor:</Text>
            <Text style={styles.textValue}>{purchase.seller.name}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Correo:</Text>
            <Text style={styles.textValue}>{purchase.seller.email}</Text>
          </View>
        </View>
        <View style={{ marginVertical: 15 }}>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Producto:</Text>
            <Text style={styles.textValue}>{purchase.product.name}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Estado:</Text>
            <Text style={styles.textValue}>{purchase.product.state}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Cantidad:</Text>
            <Text style={styles.textValue}>{purchase.quantity}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Precio Unidad:</Text>
            <Text style={styles.textValue}>${purchase.product.price}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Precio Total:</Text>
            <Text style={styles.textValue}>${purchase.totalPrice}</Text>
          </View>
        </View>
        <View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Compra:</Text>
            <Text style={styles.textValue}>{purchase.buyDate}</Text>
          </View>
        </View>
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
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 12
  },
  textInitial: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    color: '#202020'
  },
  textSecond: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    color: '#D86767'
  },
  card: {
    padding: 0,
    borderWidth: 0,
    margin: 0
  },
  boxContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
  }
});

export default PurchaseDetails;
