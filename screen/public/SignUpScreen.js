import { Pressable, View, Text, TextInput } from 'react-native';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import SelectItem from '../../components/SelectItem';
import { Divider } from 'react-native-elements';
import RutValidator from 'w2-rut-validator';
import React, { useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

const { width } = Dimensions.get('screen');

const SignUpScreen = function ({ navigation }) {
  const [options, setOptions] = useState([{}]);

  const [selectVisible, setSelectVisible] = useState(false);

  const rutReference = useRef(null);
  const nameReference = useRef(null);
  const cellphoneReference = useRef(null);
  const emailReference = useRef(null);
  const typeReference = useRef(null);

  const RegisterSchema = yup.object().shape({
    rut: yup
      .string()
      .nullable(true)
      .min(9, 'El rut debe tener 9 caracteres mínimo.')
      .max(10, 'El rut debe tener 10 caracteres máximo.')
      .required('Ingresa un rut valido para continuar.')
      .test(
        'Ingreso de correo eléctronico invalido',
        'Ingresa un rut valido para continuar.',
        (value) => {
          if (value != undefined) {
            return RutValidator.validate(value);
          }
        }
      ),
    name: yup
      .string()
      .nullable(true)
      .min(3, 'El nombre debe poseer al menos 3 caracteres.')
      .required('Ingresa un nombre valido para continuar.'),
    cellphone: yup
      .string()
      .nullable(true)
      .min(9, 'El celular debe tener 9 números mínimo.')
      .max(9, 'El celular debe tener 9 números máximo.')
      .required('Ingresa un celular valido para continuar.'),
    email: yup
      .string()
      .nullable(true)
      .email('El correo debe tener un formato valido.')
      .required('Ingresa un correo valido para continuar.'),
    type: yup
      .string()
      .nullable(true)
      .required('Selecciona el tipo de usuario que serás.')
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
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }} pointerEvents={'auto'}>
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
              <Text style={styles.textLabel}>Rut</Text>
              <TextInput
                ref={rutReference}
                style={styles.textInput}
                onChangeText={(value) => {
                  setFieldValue('rut', value);
                }}
                onBlur={() => {
                  setFieldTouched('rut');
                }}
                onSubmitEditing={() => {
                  nameReference.current.focus();
                }}
                keyboardType={'default'}
                selectionColor={'#686565'}
                blurOnSubmit={false}
                returnKeyType="next"
                value={values.rut}
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.rut && errors.rut ? errors.rut : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.divider} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Nombre</Text>
              <TextInput
                ref={nameReference}
                style={styles.textInput}
                onChangeText={(value) => {
                  setFieldValue('name', value);
                }}
                onBlur={() => {
                  setFieldTouched('name');
                }}
                onSubmitEditing={() => {
                  cellphoneReference.current.focus();
                }}
                keyboardType={'default'}
                selectionColor={'#686565'}
                blurOnSubmit={false}
                returnKeyType="next"
                value={values.name}
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.name && errors.name ? errors.name : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.divider} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Celular</Text>
              <TextInput
                ref={cellphoneReference}
                style={styles.textInput}
                onChangeText={(value) => {
                  setFieldValue('cellphone', value);
                }}
                onBlur={() => {
                  setFieldTouched('cellphone');
                }}
                onSubmitEditing={() => {
                  emailReference.current.focus();
                }}
                keyboardType={'numeric'}
                selectionColor={'#686565'}
                blurOnSubmit={false}
                returnKeyType="next"
                value={values.cellphone}
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.cellphone && errors.cellphone ? errors.cellphone : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.divider} />

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
                  Keyboard.dismiss();

                  setFieldTouched('type');
                  setOptions([
                    { key: 'type', value: 'Vendedor' },
                    { key: 'type', value: 'Comprador' }
                  ]);
                  setSelectVisible(true);
                }}
                keyboardType={'email-address'}
                selectionColor={'#686565'}
                blurOnSubmit={false}
                returnKeyType="next"
                value={values.email}
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.email && errors.email ? errors.email : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.divider} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Tipo</Text>
              <Pressable
                onPress={() => {
                  setFieldTouched('type');
                  setOptions([
                    { key: 'type', value: 'Vendedor' },
                    { key: 'type', value: 'Comprador' }
                  ]);
                  setSelectVisible(true);
                }}
                style={{ width: '100%' }}
              >
                <TextInput
                  ref={typeReference}
                  value={values.type}
                  style={styles.textInput}
                  editable={false}
                />
              </Pressable>
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.type && errors.type ? errors.type : ''}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#957765' : '#A17E68' },
                styles.button
              ]}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textButton}>CONTINUAR</Text>
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

export default SignUpScreen;
