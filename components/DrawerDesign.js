import { Pressable, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from 'react-native-elements';
import Firebase from '../service/Firebase';
import React from 'react';

const DrawerDesign = (props) => {
  const { user } = props;

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
          <Text>{user && user.nombre}</Text>
          <Text>{user && user.correo}</Text>
        </View>
      </View>

      <View>
        <Pressable onPress={() => console.log('ViewProducts')}>
          <Feather name="eye" size={24} color="black" />
          <Text>Ver Productos</Text>
        </Pressable>

        <Pressable onPress={() => console.log('NewProducts')}>
          <Feather name="plus-circle" size={24} color="black" />
          <Text>Nuevo Producto</Text>
        </Pressable>

        <Pressable onPress={() => console.log('Ratings')}>
          <Feather name="star" size={24} color="black" />
          <Text>Valoraciones</Text>
        </Pressable>

        <Pressable onPress={() => console.log('Sales')}>
          <Feather name="shopping-bag" size={24} color="black" />
          <Text>Ventas</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            Firebase.LogoutUser();
            navigation.navigate('AuthScreens');
          }}
        >
          <Ionicons name="exit-outline" size={24} color="black" />
          <Text>Cerrar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DrawerDesign;
