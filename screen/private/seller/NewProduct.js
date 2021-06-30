import { Keyboard, Pressable, View, Text, TextInput } from 'react-native';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectItem from '../../../components/SelectItem';
import LoadData from '../../../function/LoadData';
import { Divider } from 'react-native-elements';
import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const { width } = Dimensions.get('screen');

const NewProduct = ({ navigation }) => {
  const [options, setOptions] = useState([{}]);

  const [selectVisible, setSelectVisible] = useState(false);

  const nameReference = useRef(null);
  const quantityReference = useRef(null);
  const priceReference = useRef(null);

  const NewProductSchema = yup.object().shape({
    name: yup
      .string()
      .nullable(true)
      .required('Ingresa un nombre para el producto.'),
    quantity: yup
      .string()
      .nullable(true)
      .required('Ingresa una cantidad para el producto.'),
    price: yup
      .string()
      .nullable(true)
      .required('Ingresa un precio para el producto.'),
    state: yup
      .string()
      .nullable(true)
      .required('Selecciona un estado para el producto.'),
    description: yup
      .string()
      .nullable(true)
      .required('Ingresa descripción para el producto.')
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
      name: '',
      state: '',
      description: '',
      quantity: '',
      price: ''
    },
    validationSchema: NewProductSchema,
    onSubmit: (values) => {
      navigation.navigate('Continue', { photoData: values });
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }} pointerEvents={'auto'}>
      {selectVisible ? (
        <SelectItem
          setFieldValue={setFieldValue}
          setSelectVisible={setSelectVisible}
          visible={selectVisible}
          options={options}
        />
      ) : null}

      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.replace('SellerScreens');
          }}
        >
          <Ionicons
            size={24}
            style={styles.iconsButton}
            name="arrow-back"
            color="black"
          />
        </Pressable>
        <Text style={styles.textTitle}>Nuevo Producto</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
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
                  quantityReference.current.focus();
                }}
                keyboardType={'default'}
                selectionColor={'#686565'}
                returnKeyType="next"
                value={values.name}
                blurOnSubmit={false}
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.name && errors.name ? errors.name : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.separator} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Cantidad</Text>
              <TextInput
                ref={quantityReference}
                style={styles.textInput}
                onChangeText={(value) => {
                  setFieldValue('quantity', value);
                }}
                onBlur={() => {
                  setFieldTouched('quantity');
                }}
                onSubmitEditing={() => {
                  priceReference.current.focus();
                }}
                keyboardType={'numeric'}
                selectionColor={'#686565'}
                value={values.quantity}
                returnKeyType="next"
                blurOnSubmit={false}
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.quantity && errors.quantity ? errors.quantity : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.separator} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Precio</Text>
              <TextInput
                ref={priceReference}
                style={styles.textInput}
                onChangeText={(value) => {
                  setFieldValue('price', value);
                }}
                onBlur={() => {
                  setFieldTouched('price');
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();

                  setFieldTouched('state');

                  LoadData.States().then((response) => {
                    setOptions(response), setSelectVisible(true);
                  });
                }}
                keyboardType={'numeric'}
                selectionColor={'#686565'}
                returnKeyType="next"
                value={values.price}
                blurOnSubmit={false}
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.price && errors.price ? errors.price : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.separator} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Estado</Text>
              <Pressable
                onPress={() => {
                  LoadData.States().then((response) => {
                    setOptions(response), setSelectVisible(true);
                  });
                }}
                style={{ width: '100%' }}
              >
                <TextInput
                  value={values.state}
                  style={styles.textInput}
                  editable={false}
                />
              </Pressable>
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.state && errors.state ? errors.state : ''}
              </Text>
            </View>

            <Divider orientation="horizontal" style={styles.separator} />

            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Descripción</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => {
                  setFieldValue('description', value);
                }}
                onBlur={() => {
                  setFieldTouched('description');
                }}
                keyboardType={'default'}
                selectionColor={'#686565'}
                value={values.description}
                multiline
              />
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.description && errors.description ? errors.description : ''}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                { marginBottom: 10 },
                { backgroundColor: pressed ? '#957765' : '#A17E68' },
                styles.button
              ]}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textButton}>CONTINUAR</Text>
            </Pressable>
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
    marginTop: 12,
    width: width - width * 0.15
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
  separator: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 10
  },
  button: {
    width: '100%',
    borderRadius: 2,
    marginBottom: 20,
    marginTop: 30,
    padding: 9
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
    fontSize: 15
  }
});

export default NewProduct;
