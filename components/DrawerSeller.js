import { Pressable, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from 'react-native-elements';
import Firebase from '../service/Firebase';
import React from 'react';

const DrawerSeller = (props) => {
  const { user, navigation } = props;

  return (
    <View>
      <View>
        <Avatar
          rounded
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
          }}
        />
        <View>
          <Text>{user && user.name}</Text>
          <Text>{user && user.email}</Text>
        </View>
      </View>

      <View>
        <Pressable onPress={() => navigation.navigate('ViewProducts')}>
          <Feather name="eye" size={24} color="black" />
          <Text>Ver Productos</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('NewProduct')}>
          <Feather name="plus-circle" size={24} color="black" />
          <Text>Nuevo Producto</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('ViewRatings')}>
          <Feather name="star" size={24} color="black" />
          <Text>Valoraciones</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('ViewSales')}>
          <Feather name="shopping-bag" size={24} color="black" />
          <Text>Ventas</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            Firebase.LogoutUser();
            navigation.replace('AuthScreens');
          }}
        >
          <Ionicons name="exit-outline" size={24} color="black" />
          <Text>Cerrar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DrawerSeller;
