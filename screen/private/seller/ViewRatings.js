import { StatusBar, ScrollView, SafeAreaView } from 'react-native';
import { Divider, Image, Card, ListItem } from 'react-native-elements';
import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Firebase from '../../../service/Firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewRatings = ({ navigation }) => {
  // const [list, setList] = useState([]);

  const list = [
    {
      buyer: { id: 'a1a', name: 'Antonio', email: 'antonio32@mail.com' },
      rating: 5
    },
    {
      buyer: { id: 'a2a', name: 'Macarena', email: 'macarena@mail.com' },
      rating: 2
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
        <Text>Valoraciones</Text>
      </View>

      <ScrollView>
        {list.length > 0 ? (
          list.map((rating, index) => {
            return (
              <View key={index}>
                <Text>Nombre: {rating.buyer.name}</Text>
                <Text>Correo: {rating.buyer.email}</Text>
                <Text>Valoración: {rating.rating}</Text>
              </View>
            );
          })
        ) : (
          <View>
            <Text style={{ color: 'black' }}>No se encontraron valoraciones</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewRatings;
