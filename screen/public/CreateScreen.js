import { Keyboard, Pressable, View, Text, TextInput } from 'react-native';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import SelectItem from '../../components/SelectItem';
import React, { useState, useRef } from 'react';
import { Divider } from 'react-native-elements';
import LoadData from '../../function/LoadData';
import Firebase from '../../service/Firebase';
import AlertPro from 'react-native-alert-pro';
import { useFormik } from 'formik';
import * as yup from 'yup';

const { width } = Dimensions.get('screen');

const CreateScreen = function ({ route, navigation }) {
  const [text, setText] = useState('');

  const [options, setOptions] = useState([{}]);

  const [selectVisible, setSelectVisible] = useState(false);

  const message = useRef(null);
  const warning = useRef(null);

  const addressReference = useRef(null);
  const passwordReference = useRef(null);

  const CreateSchema = yup.object().shape({
    region: yup
      .string()
      .nullable(true)
      .required('Selecciona la region de donde eres tú.'),
    address: yup
      .string()
      .nullable(true)
      .min(3, 'La dirección debe poseer al menos 3 caracteres.')
      .required('Ingresa una dirección valida para el usuario.'),
    password: yup
      .string()
      .nullable(true)
      .min(6, 'La contraseña debe tener 6 caracteres mínimo.')
      .max(20, 'La contraseña debe tener 20 caracteres máximo.')
      .required('Ingresa una contraseña valida para el usuario.'),
    commune: yup
      .string()
      .nullable(true)
      .required('Selecciona la comuna de donde eres tú.')
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
      region: '',
      address: '',
      password: '',
      commune: ''
    },
    validationSchema: CreateSchema,
    onSubmit: (values) => {
      Firebase.CreateUser(Object.assign(values, route.params.params))
        .then((response) => {
          setText('Iniciando Sesión...');
          message.current.open();

          setTimeout(() => {
            message.current.close();

            if (String(response) == 'Vendedor') {
              navigation.replace('SellerScreens');
            } else {
              navigation.replace('BuyerScreens');
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

      {selectVisible ? (
        <SelectItem
          setFieldValue={setFieldValue}
          setSelectVisible={setSelectVisible}
          selectVisible={selectVisible}
          options={options}
        />
      ) : null}

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.textTitle}>VentaLibre</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Región</Text>
              <Pressable
                onPress={() => {
                  setFieldTouched('region');
                  LoadData.Regions().then((response) => {
                    setOptions(response), setSelectVisible(true);
                    setFieldValue('commune', '');
                  });
                }}
                style={{ width: '100%' }}
              >
                <TextInput
                  value={values.region}
                  style={styles.textInput}
                  editable={false}
                />
              </Pressable>
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.region && errors.region ? errors.region : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.divider} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Comuna</Text>
              <Pressable
                onPress={() => {
                  setFieldTouched('commune');
                  LoadData.Communes(values.region).then((response) => {
                    setOptions(response), setSelectVisible(true);
                  });
                }}
                style={{ width: '100%' }}
              >
                <TextInput
                  value={values.commune}
                  style={styles.textInput}
                  editable={false}
                />
              </Pressable>
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.commune && errors.commune ? errors.commune : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.divider} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Dirección</Text>
              <TextInput
                ref={addressReference}
                style={styles.textInput}
                onChangeText={(value) => {
                  setFieldValue('address', value);
                }}
                onBlur={() => {
                  setFieldTouched('address');
                }}
                onSubmitEditing={() => {
                  passwordReference.current.focus();
                }}
                keyboardType={'default'}
                selectionColor={'#686565'}
                returnKeyType="next"
                value={values.address}
                blurOnSubmit={false}
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.address && errors.address ? errors.address : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.divider} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Contraseña</Text>
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
                keyboardType={'default'}
                selectionColor={'#686565'}
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
              <Text style={styles.textButton}>CREAR CUENTA</Text>
            </Pressable>

            <View>
              <Text
                onPress={() => {
                  navigation.navigate('SignInScreen');
                }}
                style={styles.textFooter}
              >
                ¿Tienes una cuenta? Iniciar Sesión
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

export default CreateScreen;
