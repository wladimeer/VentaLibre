import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ScrollView, Pressable, View, Text, TextInput } from 'react-native';
import LoadData from '../../function/LoadData';
import Firebase from '../../service/Firebase';
import SelectItem from '../../components/SelectItem';
import AlertPro from 'react-native-alert-pro';
import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const CreateScreen = function ({ route, navigation }) {
  const [selectVisible, setSelectVisible] = useState(false);
  const [options, setOptions] = useState([{}]);

  const message = useRef(null);
  const warning = useRef(null);

  const [text, setText] = useState('');
  const [state, setState] = useState(false);

  const CreateSchema = yup.object().shape({
    region: yup
      .string()
      .nullable(true)
      .min(3, 'La región debe poseer al menos 3 caracteres')
      .required('Selecciona la region de donde eres tú'),
    address: yup
      .string()
      .nullable(true)
      .min(3, 'La dirección debe poseer al menos 3 caracteres')
      .required('Ingresa un nombre valido para la dirección'),
    password: yup
      .string()
      .nullable(true)
      .min(6, 'La contraseña debe tener 6 caracteres mínimo')
      .max(20, 'La contraseña debe tener 20 caracteres máximo')
      .required('Ingresa una contraseña valida para el usuario'),
    commune: yup
      .string()
      .nullable(true)
      .min(3, 'La comuna debe poseer al menos 3 caracteres')
      .required('Selecciona la comuna de donde eres tú')
  });

  const { values, setFieldValue, handleSubmit, resetForm, errors } = useFormik({
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
          setText('Iniciando Sesión!');
          message.current.open();
          setState(true);

          setTimeout(() => {
            message.current.close();

            if (String(response) == 'Vendedor') {
              navigation.replace('SellerScreens');
            } else {
              navigation.replace('BuyerScreens');
            }
          }, 2800);
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
      <StatusBar animated={true} backgroundColor="#000000" />

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

      <ScrollView>
        <View>
          <Text>VentaLibre</Text>

          <View>
            <Text>Región</Text>
            <Pressable
              onPress={() => {
                LoadData.Regions().then((response) => {
                  setOptions(response), setSelectVisible(true);
                  setFieldValue('commune', '');
                });
              }}
            >
              <TextInput value={values.region} editable={false} />
            </Pressable>
            <Text>{errors.region ? errors.region : ''}</Text>
            <SelectItem
              setFieldValue={setFieldValue}
              setSelectVisible={setSelectVisible}
              visible={selectVisible}
              options={options}
            />
          </View>

          <View>
            <Text>Comuna</Text>
            <Pressable
              onPress={() => {
                LoadData.Communes(values.region).then((response) => {
                  setOptions(response), setSelectVisible(true);
                });
              }}
            >
              <TextInput value={values.commune} editable={false} />
            </Pressable>
            <Text>{errors.commune ? errors.commune : ''}</Text>
            <SelectItem
              setFieldValue={setFieldValue}
              setSelectVisible={setSelectVisible}
              visible={selectVisible}
              options={options}
            />
          </View>

          <View>
            <Text>Dirección</Text>
            <TextInput
              onChangeText={(value) => {
                setFieldValue('address', value);
              }}
              keyboardType={'default'}
              selectionColor={'#686565'}
              value={values.address}
            />
            <Text>{errors.address ? errors.address : ''}</Text>
          </View>

          <View>
            <Text>Contraseña</Text>
            <TextInput
              onChangeText={(value) => {
                setFieldValue('password', value);
              }}
              keyboardType={'default'}
              selectionColor={'#686565'}
              value={values.password}
              secureTextEntry={true}
            />
            <Text>{errors.password ? errors.password : ''}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
              }
            ]}
            onPress={() => handleSubmit()}
          >
            <Text>CREAR CUENTA</Text>
          </Pressable>

          <View>
            <Text
              onPress={() => {
                navigation.navigate('SignInScreen');
              }}
            >
              ¿Tienes una cuenta? Iniciar Sesión
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateScreen;
