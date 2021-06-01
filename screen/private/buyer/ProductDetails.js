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
import { Linking } from 'react-native';

const ProductDetails = ({ route, navigation }) => {
  const { product, user } = route.params;
  const { width, height } = Dimensions.get('screen');
  const message = useRef(null);
  const warning = useRef(null);
  const [text, setText] = useState('');

  return (
    <SafeAreaView>
      <StatusBar animated={true} backgroundColor="#000000" />

      <AlertPro
        ref={message}
        showCancel={false}
        showConfirm={false}
        title="Atención"
        message={text}
        onConfirm={() => message.current.close()}
        customStyles={{
          mask: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          container: {
            width: '80%',
            shadowOpacity: 0.1,
            shadowRadius: 10
          }
        }}
      />

      <AlertPro
        ref={warning}
        onConfirm={() => {
          Firebase.DeleteProduct(product.id)
            .then((response) => {
              setText(String(response));
              warning.current.close();
              message.current.open();

              setTimeout(() => {
                navigation.replace('BuyerScreens');
                setText('');
              }, 2000);
            })
            .catch((response) => {
              setText(String(response));
              warning.current.close();
              message.current.open();
            });
        }}
        onCancel={() => warning.current.close()}
        title="Atención"
        message={text}
        textConfirm="Eliminar"
        textCancel="Cancelar"
        customStyles={{
          mask: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          container: {
            width: '80%',
            shadowOpacity: 0.1,
            shadowRadius: 10
          },
          buttonConfirm: {
            borderWidth: 2,
            backgroundColor: 'transparent',
            borderColor: '#1B1A7B'
          },
          buttonCancel: {
            borderWidth: 2,
            backgroundColor: 'transparent',
            borderColor: '#E91212'
          },
          textConfirm: {
            color: '#000000'
          },
          textCancel: {
            color: '#000000'
          }
        }}
      />

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
          <Text>{product.creation}</Text>
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
          <Text>Se debe añadir</Text>
        </View>
      </View>

      <View>
        <Pressable
          onPress={() => {
            console.log('COMPRAR');
          }}
        >
          <Text>COMPRAR</Text>
        </Pressable>
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
