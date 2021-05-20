import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ScrollView, Pressable, View, Text, TextInput } from 'react-native';
import React from 'react';

const SignInScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#8E8887' }}>
      <StatusBar animated={true} backgroundColor="#000000" />

      <ScrollView>
        <Text>VentaLibre</Text>

        <View>
          <Text>Correo</Text>
          <TextInput keyboardType={'email-address'} selectionColor={'#686565'} />
        </View>

        <View>
          <Text>Constraseña</Text>
          <TextInput
            keyboardType={'default'}
            selectionColor={'#686565'}
            secureTextEntry={true}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }
          ]}
        >
          <Text>Iniciar Sesión</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SignInScreen;
