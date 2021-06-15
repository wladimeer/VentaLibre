import {
  ActivityIndicator,
  StatusBar,
  Dimensions,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { SearchBar, Divider, Image, Card, ListItem } from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Firebase from '../../../service/Firebase';

const ViewProducts = ({ navigation }) => {
  const { width, height } = Dimensions.get('screen');
  const [find, setFind] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    Firebase.FindAllProducts().then((response) => {
      setList(response);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated={true} hidden={false} backgroundColor="#000000" />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Pressable
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <EvilIcons name="navicon" size={30} color="white" />
        </Pressable>

        <Text>VentaLibre</Text>

        <SearchBar
          containerStyle={{ width: 200 }}
          platform={'android'}
          placeholder="Ingresa para buscar"
          onChangeText={(value) => {
            Firebase.SearchAllProducts(value).then((response) => {
              setFind(response);
            });
          }}
        />

        <Pressable
          onPress={() => {
            navigation.navigate('ReduceProducts');
          }}
        >
          <Feather name="filter" size={24} color="white" />
        </Pressable>
      </View>

      <ScrollView>
        {find.length > 0 ? (
          find.map((product, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  Firebase.FindUser(product.user).then((response) => {
                    navigation.navigate('ProductDetails', {
                      product: product,
                      user: response
                    });
                  });
                }}
              >
                <Card containerStyle={{ borderRadius: 5, padding: 0 }}>
                  <View>
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Image
                        source={{ uri: product.photos[0].url }}
                        style={{
                          width: width,
                          height: height - 569,
                          borderTopLeftRadius: 3,
                          borderTopRightRadius: 3
                        }}
                        PlaceholderContent={
                          <ActivityIndicator size="large" color="#00ff00" />
                        }
                        resizeMode={'contain'}
                      />
                    </View>
                    <Text>${product.price}</Text>
                    <Text>{product.name}</Text>
                  </View>
                </Card>
              </Pressable>
            );
          })
        ) : list.length > 0 ? (
          list.map((product, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  Firebase.FindUser(product.user).then((response) => {
                    navigation.navigate('ProductDetails', {
                      product: product,
                      user: response
                    });
                  });
                }}
              >
                <Card containerStyle={{ borderRadius: 5, padding: 0 }}>
                  <View>
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Image
                        source={{ uri: product.photos[0].url }}
                        style={{
                          width: width,
                          height: height - 569,
                          borderTopLeftRadius: 3,
                          borderTopRightRadius: 3
                        }}
                        PlaceholderContent={
                          <ActivityIndicator size="large" color="#00ff00" />
                        }
                        resizeMode={'contain'}
                      />
                    </View>
                    <Text>${product.price}</Text>
                    <Text>{product.name}</Text>
                  </View>
                </Card>
              </Pressable>
            );
          })
        ) : (
          <View>
            <Text style={{ color: 'black' }}>No se encontraron publicaciones</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewProducts;
