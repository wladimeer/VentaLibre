import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import { Linking } from 'react-native';
import React from 'react';

const About = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.replace('BuyerScreens');
          }}
        >
          <Ionicons
            size={24}
            name="arrow-back"
            style={styles.iconsButton}
            color="black"
          />
        </Pressable>
        <Text style={styles.textTitle}>Acerca de</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <View style={styles.content}>
        <Text style={styles.message}>
          Esta aplicación ha sido desarrollada para la compra y venta de productos,
          para realizar cualquier comentario, reclamo, o denuncia deberá contactarse
          con el equipo de desarrollo.
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <Pressable
          onPress={() => {
            Linking.openURL(
              'mailto:ventalibre@gmail.com?subject=Escribe aquí tu motivo...&body=Escribe aquí tu mensaje...'
            );
          }}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#957765' : '#A17E68' },
            styles.button
          ]}
        >
          <Text style={styles.textButton}>CORREO</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            Linking.openURL(
              'whatsapp://send?text=Escribe aquí tu mensaje...&phone=56967542397'
            );
          }}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#957765' : '#A17E68' },
            styles.button
          ]}
        >
          <Text style={styles.textButton}>MENSAJE</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12
  },
  iconsButton: {
    borderColor: '#F2F2F2',
    textAlignVertical: 'bottom',
    borderWidth: 1
  },
  textTitle: {
    fontSize: 22,
    borderWidth: 1,
    textAlignVertical: 'top',
    fontFamily: 'Quicksand-Regular',
    borderColor: '#F2F2F2',
    marginLeft: 20
  },
  divider: {
    width: '100%',
    backgroundColor: '#787373',
    borderWidth: 0.3,
    marginTop: 0
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 12
  },
  message: {
    fontSize: 15,
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'justify',
    color: '#626262'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5
  },
  button: {
    width: '45%',
    borderRadius: 2,
    minWidth: 120,
    marginTop: 30,
    padding: 9
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'Quicksand-Regular',
    textAlignVertical: 'top',
    textAlign: 'center',
    fontSize: 15
  }
});

export default About;
