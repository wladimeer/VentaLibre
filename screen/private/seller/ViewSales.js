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
  const [list, setList] = useState([]);

  const { width, height } = Dimensions.get('screen');

  useEffect(() => {
    Firebase.ReadPurchases().then((response) => {
      setList(response);
    });
  }, []);

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
                    <Text>${sales.totalPrice}</Text>
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
