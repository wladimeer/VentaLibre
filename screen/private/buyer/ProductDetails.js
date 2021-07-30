import { FlatList, Dimensions, StyleSheet } from 'react-native';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { Image, Card, Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PriceFormat from 'price-text-format';
import { Linking } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('screen');

const ProductDetails = ({ route, navigation }) => {
  const { product, user } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.replace('BuyerScreens');
          }}
        >
          <Ionicons
            size={24}
            name="arrow-back"
            style={styles.iconsButton}
            color="black"
          />
        </Pressable>
        <Text style={styles.textTitle}>Detalle del Producto</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <View style={styles.content}>
        <Text style={styles.textInitial}>{product.name}</Text>
        <Text style={styles.textSecond}>${PriceFormat(product.price)}</Text>
      </View>

      <View style={{ marginVertical: 20 }}>
        <Card containerStyle={styles.card}>
          <FlatList
            horizontal
            pagingEnabled
            data={product.photos}
            keyExtractor={(item) => item.url}
            style={{ width: width, height: 250 }}
            showsHorizontalScrollIndicator={false}
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
        <Text style={styles.textValue}>{product.description}</Text>
        <View style={{ marginVertical: 15 }}>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Publicación:</Text>
            <Text style={styles.textValue}>{product.creationDate}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Estado:</Text>
            <Text style={styles.textValue}>{product.state}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Cantidad:</Text>
            <Text style={styles.textValue}>{product.quantity}</Text>
          </View>
        </View>

        <View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Vendedor:</Text>
            <Text style={styles.textValue}>{user.name}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Celular:</Text>
            <Text style={styles.textValue}>{user.cellphone}</Text>
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.textLabel}>Valoración:</Text>
            <Text style={styles.textValue}>{user.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
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
            style={({ pressed }) => [
              { backgroundColor: pressed ? '#957765' : '#A17E68' },
              styles.button
            ]}
          >
            <Text style={styles.textButton}>COMPRAR</Text>
          </Pressable>
        ) : (
          <Pressable
            disabled
            style={({ pressed }) => [
              { backgroundColor: pressed ? '#BDC3C7' : '#BDC3C7' },
              styles.button
            ]}
          >
            <Text style={styles.textButton}>NO DISPONIBLE</Text>
          </Pressable>
        )}
        <Pressable
          onPress={() => {
            Linking.openURL(
              `whatsapp://send?text=Hola ${user.name}, te hablo por el producto "${
                product.name
              }" desde VentaLibre&phone=56${String(user.cellphone)}`
            );
          }}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#957765' : '#A17E68' },
            styles.button
          ]}
        >
          <Text style={styles.textButton}>MENSAJE</Text>
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
  }
});

export default ProductDetails;
