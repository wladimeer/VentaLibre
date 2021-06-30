import { ScrollView, Pressable, View, Text, TextInput } from 'react-native';
import { Keyboard, StatusBar, StyleSheet, Dimensions } from 'react-native';
import React, { useRef, useState } from 'react';
import { Divider } from 'react-native-elements';
import AlertPro from 'react-native-alert-pro';
import Firebase from '../../service/Firebase';
import { useFormik } from 'formik';
import * as yup from 'yup';

const { width } = Dimensions.get('screen');

const SignInScreen = ({ navigation }) => {
  const [text, setText] = useState('');

  const message = useRef(null);
  const warning = useRef(null);

  const passwordReference = useRef(null);
  const emailReference = useRef(null);

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .nullable(true)
      .required('Ingresa un correo valido para continuar.'),
    password: yup
      .string()
      .nullable(true)
      .required('Ingresa una contraseña para continuar.')
  });

  const {
    values,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm,
    touched,
    errors
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      Firebase.LoginUser(values)
        .then((response) => {
          setText('Iniciando Sesión...');
          message.current.open();

          setTimeout(() => {
            message.current.close();

            switch (String(response)) {
              case 'Vendedor':
                navigation.replace('SellerScreens');
                break;
              case 'Comprador':
                navigation.replace('BuyerScreens');
                break;
            }
          }, 2200);
        })
        .catch((response) => {
          setText(String(response));
          warning.current.open();
          return;
        });
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }} pointerEvents={'auto'}>
      <StatusBar barStyle="light-content" backgroundColor="#000" animated={true} />

      <AlertPro
        ref={message}
        title="Atención"
        customStyles={design.message}
        showConfirm={false}
        showCancel={false}
        message={text}
      />

      <AlertPro
        ref={warning}
        title="Atención"
        textConfirm="ENTIENDO"
        onConfirm={() => warning.current.close()}
        customStyles={design.warning}
        showCancel={false}
        message={text}
      />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.textTitle}>VentaLibre</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Correo</Text>
              <TextInput
                ref={emailReference}
                style={styles.textInput}
                onChangeText={(value) => {
                  setFieldValue('email', value);
                }}
                onBlur={() => {
                  setFieldTouched('email');
                }}
                onSubmitEditing={() => {
                  passwordReference.current.focus();
                }}
                keyboardType={'email-address'}
                selectionColor={'#686565'}
                returnKeyType="next"
                value={values.email}
                blurOnSubmit={false}
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.email && errors.email ? errors.email : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.divider} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Constraseña</Text>
              <TextInput
                ref={passwordReference}
                style={styles.textInput}
                onChangeText={(value) => {
                  setFieldValue('password', value);
                }}
                onBlur={() => {
                  setFieldTouched('password');
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  handleSubmit();
                }}
                selectionColor={'#686565'}
                keyboardType={'default'}
                value={values.password}
                secureTextEntry={true}
                returnKeyType="go"
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.password && errors.password ? errors.password : ''}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#957765' : '#A17E68' },
                styles.button
              ]}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textButton}>INICIAR SESIÓN</Text>
            </Pressable>

            <View>
              <Text
                onPress={() => {
                  navigation.navigate('SignUpScreen');
                }}
                style={styles.textFooter}
              >
                ¿No tienes una cuenta? Crear Cuenta
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    alignItems: 'center'
  },
  content: {
    width: width - width * 0.15
  },
  textTitle: {
    color: '#353030',
    fontFamily: 'GreatVibes-Regular',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
    fontSize: 40
  },
  textLabel: {
    color: '#353030',
    fontFamily: 'Quicksand-Regular',
    marginBottom: 3,
    fontSize: 14
  },
  textInput: {
    width: '100%',
    color: '#5C5757',
    borderColor: '#A17E68',
    fontFamily: 'Quicksand-SemiBold',
    paddingHorizontal: 5,
    borderRadius: 2,
    borderWidth: 2,
    fontSize: 14,
    padding: 2
  },
  inputGroup: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start'
  },
  button: {
    width: '100%',
    borderRadius: 2,
    marginTop: 30,
    padding: 9
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
    fontSize: 15
  },
  textFooter: {
    color: '#626262',
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
    fontSize: 13,
    margin: 20
  },
  divider: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 10
  }
});

const design = {
  warning: {
    mask: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    container: {
      width: '80%',
      shadowOpacity: 0.1,
      shadowRadius: 10
    },
    title: {
      fontFamily: 'Quicksand-SemiBold'
    },
    message: {
      fontFamily: 'Quicksand-Regular'
    },
    buttonConfirm: {
      backgroundColor: '#957765',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 2
    },
    textConfirm: {
      color: '#FFFFFF',
      fontFamily: 'Quicksand-Regular',
      fontSize: 15
    }
  },
  message: {
    mask: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    container: {
      width: '80%',
      shadowOpacity: 0.1,
      shadowRadius: 10
    },
    title: {
      fontFamily: 'Quicksand-SemiBold'
    },
    message: {
      fontFamily: 'Quicksand-Regular'
    }
  }
};

export default SignInScreen;
