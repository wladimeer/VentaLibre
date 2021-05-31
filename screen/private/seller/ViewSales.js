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

const ViewSales = ({ navigation }) => {
  // const [list, seyList] = useState([]);

  const { width, height } = Dimensions.get('screen');

  const list = [
    {
      product: {
        name: 'Zapatos de terno',
        price: 25000,
        state: 'Nuevo',
        quantity: 1,
        photos: [
          {
            url: 'https://www.bata.cl/modules/psclfilterhome/images/efc8d92b292fc7a23557a27829f257ef97f8279a_HOMBRE_TALLA_BATA_NORMAL.png',
            creation: '25/02/2020'
          },
          {
            url: 'https://images-na.ssl-images-amazon.com/images/I/61UN%2B%2BGV3cL._AC_UY500_.jpg',
            creation: '25/02/2020'
          }
        ]
      },
      buyer: {
        name: 'Antonio',
        email: 'antonio32@mail.com'
      },
      buyout: '05/12/2020',
      total: 25000,
      quantity: 1
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar animated={true} hidden={false} backgroundColor="#000000" />

      <View>
        <Pressable
          onPress={() => {
            navigation.replace('SellerScreens');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Ventas</Text>
      </View>

      <ScrollView>
        {list.length > 0 ? (
          list.map((sales, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate('PurchaseDetails', { purchase: sales });
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
                        source={{ uri: sales.product.photos[0].url }}
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
                    <Text>${sales.total}</Text>
                    <Text>{sales.product.name}</Text>
                  </View>
                </Card>
              </Pressable>
            );
          })
        ) : (
          <View>
            <Text style={{ color: 'black' }}>No se encontraron ventas</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewSales;