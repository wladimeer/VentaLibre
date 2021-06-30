import { Pressable, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar, Divider } from 'react-native-elements';
import Firebase from '../service/Firebase';
import React from 'react';

const DrawerSeller = (props) => {
  const { user, navigation } = props;
  const image = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar rounded source={{ uri: image }} size={45} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.textInitial}>{user && user.name}</Text>
          <Text style={styles.textSecond}>{user && user.email}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View>
          <Divider orientation="horizontal" style={styles.divider} />

          <View style={{ paddingVertical: 6 }}>
            <Pressable
              onPress={() => navigation.navigate('ViewProducts')}
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#957765' : '#A17E68' },
                styles.button
              ]}
            >
              <Feather
                size={24}
                style={{ textAlignVertical: 'center' }}
                color="#FFFFFF"
                name="eye"
              />
              <Text style={styles.textLabel}>Ver Productos</Text>
            </Pressable>

            <Divider orientation="horizontal" style={styles.separator} />

            <Pressable
              onPress={() => navigation.navigate('NewProduct')}
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#957765' : '#A17E68' },
                styles.button
              ]}
            >
              <Feather
                size={24}
                style={{ textAlignVertical: 'center' }}
                name="plus-circle"
                color="#FFFFFF"
              />
              <Text style={styles.textLabel}>Nuevo Producto</Text>
            </Pressable>

            <Divider orientation="horizontal" style={styles.separator} />

            <Pressable
              onPress={() => navigation.navigate('ViewRatings')}
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#957765' : '#A17E68' },
                styles.button
              ]}
            >
              <Feather
                size={24}
                style={{ textAlignVertical: 'center' }}
                color="#FFFFFF"
                name="star"
              />
              <Text style={styles.textLabel}>Valoraciones</Text>
            </Pressable>

            <Divider orientation="horizontal" style={styles.separator} />

            <Pressable
              onPress={() => navigation.navigate('ViewSales')}
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#957765' : '#A17E68' },
                styles.button
              ]}
            >
              <Feather
                size={24}
                style={{ textAlignVertical: 'center' }}
                name="shopping-bag"
                color="#FFFFFF"
              />
              <Text style={styles.textLabel}>Ventas</Text>
            </Pressable>
          </View>

          <Divider orientation="horizontal" style={styles.divider} />
        </View>

        <View>
          <Pressable
            onPress={() => {
              Firebase.LogoutUser();

              setTimeout(() => {
                navigation.replace('AuthScreens');
              }, 500);
            }}
            style={({ pressed }) => [
              { backgroundColor: pressed ? '#957765' : '#A17E68' },
              styles.button
            ]}
          >
            <Ionicons
              size={24}
              style={{ textAlignVertical: 'center' }}
              name="exit-outline"
              color="#FFFFFF"
            />
            <Text style={styles.textLabel}>Cerrar Sesión</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F1F1F1'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 12
  },
  textInitial: {
    fontSize: 14,
    fontFamily: 'Quicksand-Bold',
    color: '#353030'
  },
  textSecond: {
    fontSize: 13,
    fontFamily: 'Quicksand-Regular',
    color: '#626262'
  },
  content: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'space-between',
    backgroundColor: '#F1F1F1'
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10
  },
  textLabel: {
    textAlignVertical: 'top',
    borderColor: 'transparent',
    fontFamily: 'Quicksand-Regular',
    color: '#FFFFFF',
    borderWidth: 1,
    marginLeft: 10,
    fontSize: 15
  },
  divider: {
    width: '100%',
    backgroundColor: '#787373',
    borderWidth: 0.3,
    marginTop: 0
  },
  separator: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 3
  }
});

export default DrawerSeller;
