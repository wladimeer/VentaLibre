import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { ScrollView, Pressable, View, Text, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import AlertPro from 'react-native-alert-pro';
import Firebase from '../../service/Firebase';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const SignInScreen = ({ navigation }) => {
  const [text, setText] = useState('');

  const [state, setState] = useState(false);

  const message = useRef(null);
  const warning = useRef(null);

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .nullable(true)
      .email('El correo debe tener un formato valido')
      .required('Ingresar un correo valido para continuar'),
    password: yup
      .string()
      .nullable(true)
      .min(6, 'La contraseña debe tener 6 caracteres minimo')
      .required('Ingresar una contraseña para continuar')
  });

  const { values, setFieldValue, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      Firebase.LoginUser(values)
        .then((response) => {
          setText('Iniciando sesión...');
          message.current.open();
          setState(true);

          setTimeout(() => {
            if (String(response) == 'Vendedor') {
              navigation.replace('SellerScreens');
            } else {
              navigation.replace('BuyerScreens');
            }

            message.current.close();
            setState(false);
            resetForm();
          }, 2000);
        })
        .catch((response) => {
          setText(String(response));
          warning.current.open();
          return;
        });
    }
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#8E8887' }}
      pointerEvents={state ? 'none' : 'auto'}
    >
      <StatusBar animated={true} backgroundColor={'#000000'} />

      <AlertPro
        ref={message}
        showCancel={false}
        showConfirm={false}
        title="Atención"
        message={text}
        onConfirm={() => message.current.close()}
        customStyles={{
          mask: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          container: {
            width: '80%',
            shadowOpacity: 0.1,
            shadowRadius: 10
          }
        }}
      />

      <AlertPro
        ref={warning}
        onConfirm={() => warning.current.close()}
        title="Atención"
        showCancel={false}
        message={text}
        textConfirm="Entiendo"
        customStyles={{
          mask: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          container: {
            width: '80%',
            shadowOpacity: 0.1,
            shadowRadius: 10
          },
          buttonConfirm: {
            borderWidth: 2,
            backgroundColor: 'transparent',
            borderColor: '#1B1A7B'
          },
          textConfirm: {
            color: '#000000'
          }
        }}
      />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>VentaLibre</Text>

        <View>
          <Text>Correo</Text>
          <TextInput
            onChangeText={(value) => {
              setFieldValue('email', value);
            }}
            keyboardType={'email-address'}
            selectionColor={'#686565'}
            value={values.email}
          />
          <Text>{errors.email ? errors.email : ''}</Text>
        </View>

        <View>
          <Text>Constraseña</Text>
          <TextInput
            onChangeText={(value) => {
              setFieldValue('password', value);
            }}
            selectionColor={'#686565'}
            keyboardType={'default'}
            value={values.password}
            secureTextEntry={true}
          />
          <Text>{errors.password ? errors.password : ''}</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }
          ]}
          onPress={() => handleSubmit()}
        >
          <Text>Iniciar Sesión</Text>
        </Pressable>

        <View>
          <Text
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}
          >
            ¿No tienes una cuenta? Crear Cuenta
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SignInScreen;
