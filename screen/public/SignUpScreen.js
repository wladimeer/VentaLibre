import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ScrollView, Pressable, View, Text, TextInput } from 'react-native';
import SelectItem from '../../components/SelectItem';
import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const SignUpScreen = function ({ navigation }) {
  const [selectVisible, setSelectVisible] = useState(false);
  const [options, setOptions] = useState([{}]);

  const RegisterSchema = yup.object().shape({
    rut: yup
      .string()
      .nullable(true)
      .min(9, 'El rut debe tener 9 caracteres mínimo')
      .max(10, 'El rut debe tener 10 caracteres máximo')
      .required('Ingresa un rut valido para continuar'),
    name: yup
      .string()
      .nullable(true)
      .min(3, 'El nombre debe poseer al menos 3 caracteres')
      .required('Ingresa un nombre valido para continuar'),
    cellphone: yup
      .string()
      .nullable(true)
      .min(9, 'El celular debe tener 9 caracteres mínimo')
      .max(9, 'El celular debe tener 9 caracteres máximo')
      .required('Ingresa un celular valido para continuar'),
    email: yup
      .string()
      .nullable(true)
      .email('El correo debe tener un formato valido')
      .required('Ingresar un correo valido para continuar'),
    type: yup
      .string()
      .nullable(true)
      .required('Selecciona el tipo de usuario que serás')
  });

  const { values, setFieldValue, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      rut: '',
      name: '',
      cellphone: '',
      email: '',
      type: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      navigation.navigate('CreateScreen', { params: values });
    }
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#8E8887' }}>
      <StatusBar animated={true} backgroundColor="#000000" />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>VentaLibre</Text>

          <View>
            <Text>Rut</Text>
            <TextInput
              onChangeText={(value) => {
                setFieldValue('rut', value);
              }}
              keyboardType={'default'}
              selectionColor={'#686565'}
              value={values.rut}
            />
            <Text>{errors.rut ? errors.rut : ''}</Text>
          </View>

          <View>
            <Text>Nombre</Text>
            <TextInput
              onChangeText={(value) => {
                setFieldValue('name', value);
              }}
              keyboardType={'default'}
              selectionColor={'#686565'}
              value={values.name}
            />
            <Text>{errors.name ? errors.name : ''}</Text>
          </View>

          <View>
            <Text>Celular</Text>
            <TextInput
              onChangeText={(value) => {
                setFieldValue('cellphone', value);
              }}
              keyboardType={'numeric'}
              selectionColor={'#686565'}
              value={values.cellphone}
            />
            <Text>{errors.cellphone ? errors.cellphone : ''}</Text>
          </View>

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
            <Text>Tipo</Text>
            <Pressable
              onPress={() => {
                setOptions([
                  { key: 'type', value: 'Vendedor' },
                  { key: 'type', value: 'Comprador' }
                ]);
                setSelectVisible(true);
              }}
            >
              <TextInput value={values.type} editable={false} />
            </Pressable>
            <Text>{errors.type ? errors.type : ''}</Text>
            <SelectItem
              setFieldValue={setFieldValue}
              setSelectVisible={setSelectVisible}
              visible={selectVisible}
              options={options}
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
              }
            ]}
            onPress={() => handleSubmit()}
          >
            <Text>CONTINUAR</Text>
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

export default SignUpScreen;
