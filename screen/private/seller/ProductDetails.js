import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { Dimensions, StyleSheet, FlatList } from 'react-native';
import { Image, Card, Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Firebase from '../../../service/Firebase';
import React, { useRef, useState } from 'react';
import AlertPro from 'react-native-alert-pro';

const { width, height } = Dimensions.get('screen');

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;

  const [text, setText] = useState('');

  const message = useRef(null);
  const warning = useRef(null);

  return (
    <View style={styles.container}>
      <AlertPro
        ref={message}
        title="Atención"
        customStyles={design.message}
        showConfirm={false}
        showCancel={false}
        message={text}
      />

      <AlertPro
        ref={warning}
        title="Atención"
        textCancel="CANCELAR"
        textConfirm="ELIMINAR"
        onConfirm={() => {
          Firebase.DeleteProduct(product.uid)
            .then((response) => {
              setText(String(response));
              warning.current.close();
              message.current.open();

              setTimeout(() => {
                navigation.replace('SellerScreens');
              }, 2000);
            })
            .catch((response) => {
              setText(String(response));
              message.current.close();
              warning.current.open();
            });
        }}
        onCancel={() => warning.current.close()}
        customStyles={design.options}
        message={text}
      />

      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.replace('SellerScreens');
          }}
        >
          <Ionicons
            size={24}
            style={styles.iconsButton}
            name="arrow-back"
            color="black"
          />
        </Pressable>
        <Text style={styles.textTitle}>Detalle del Producto</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <View style={styles.content}>
        <Text style={styles.textInitial}>{product.name}</Text>
        <Text style={styles.textSecond}>${product.price}</Text>
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
            <Text style={styles.textValue}>
              {product.quantity != 1
                ? `${product.quantity} Unidades`
                : `${product.quantity} Unidad`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <Pressable
          onPress={() => {
            navigation.navigate('UpdateProduct', { product: product });
          }}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#957765' : '#A17E68' },
            styles.button
          ]}
        >
          <Text style={styles.textButton}>ACTUALIZAR</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setText('¿Seguro que Quieres Eliminar Este Producto?');
            warning.current.open();
          }}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#957765' : '#A17E68' },
            styles.button
          ]}
        >
          <Text style={styles.textButton}>ELIMINAR</Text>
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

const design = {
  options: {
    mask: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    container: {
      width: '80%',
      shadowOpacity: 0.1,
      shadowRadius: 10
    },
    title: {
      fontFamily: 'Quicksand-SemiBold'
    },
    message: {
      fontFamily: 'Quicksand-Regular'
    },
    buttonConfirm: {
      backgroundColor: '#E91212',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 2
    },
    buttonCancel: {
      backgroundColor: '#FBBA12',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 2
    },
    textConfirm: {
      color: '#FFFFFF',
      fontFamily: 'Quicksand-Regular',
      fontSize: 15
    },
    textCancel: {
      color: '#FFFFFF',
      fontFamily: 'Quicksand-Regular',
      fontSize: 15
    }
  },
  message: {
    mask: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    container: {
      width: '80%',
      shadowOpacity: 0.1,
      shadowRadius: 10
    },
    title: {
      fontFamily: 'Quicksand-SemiBold'
    },
    message: {
      fontFamily: 'Quicksand-Regular'
    }
  }
};

export default ProductDetails;
