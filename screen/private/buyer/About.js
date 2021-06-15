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
import { Linking } from 'react-native';

const About = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Pressable
          onPress={() => {
            navigation.replace('BuyerScreens');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Acerca de</Text>
      </View>

      <Text>
        Esta aplicación ha sido desarrollada para la compra y venta de productos,
        cualquier comentario, reclamo, o denuncia deberá contactarse con el equipo de
        desarrollo.
      </Text>

      <View>
        <Pressable
          onPress={() => {
            Linking.openURL(
              'mailto:ventalibre@gmail.com?subject=Asunto...&body=Descripción...'
            );
          }}
        >
          <Text>CORREO</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            Linking.openURL(
              'whatsapp://send?text=' + 'Mensaje' + '&phone=56967542397'
            );
          }}
        >
          <Text>MENSAJE</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default About;
