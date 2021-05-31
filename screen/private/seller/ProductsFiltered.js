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
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductFiltered = ({ route, navigation }) => {
  const { width, height } = Dimensions.get('screen');
  const { products } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated={true} backgroundColor="#000000" />

      <View>
        <Pressable
          onPress={() => {
            navigation.replace('SellerScreens');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Productos Filtrados</Text>
      </View>

      <ScrollView>
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate('ProductDetails', {
                    product: {
                      id: product.id,
                      photos: product.photos,
                      name: product.name,
                      price: product.price,
                      description: product.description,
                      creation: product.creation,
                      quantity: product.quantity,
                      state: product.state
                    }
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

export default ProductFiltered;
