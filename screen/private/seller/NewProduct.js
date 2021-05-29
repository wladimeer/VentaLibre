import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ScrollView, Pressable, View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectItem from '../../../components/SelectItem';
import LoadData from '../../../function/LoadData';
import { useFormik } from 'formik';
import * as yup from 'yup';

const NewProduct = ({ navigation }) => {
  const [selectVisible, setSelectVisible] = useState(false);
  const [options, setOptions] = useState([{}]);

  const NewProductSchema = yup.object().shape({
    name: yup
      .string()
      .nullable(true)
      .required('Ingresar un nombre para el producto'),
    quantity: yup
      .string()
      .nullable(true)
      .required('Ingresar una cantidad para el producto'),
    price: yup
      .string()
      .nullable(true)
      .required('Ingresar un precio para el producto'),
    state: yup
      .string()
      .nullable(true)
      .required('Seleccionar un estado para el producto'),
    description: yup
      .string()
      .nullable(true)
      .required('Ingresar descripción para el producto')
  });

  const { values, setFieldValue, handleSubmit, errors, resetForm } = useFormik({
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#8E8887' }}>
      <StatusBar animated={true} backgroundColor="#000000" />
      <View>
        <Pressable
          onPress={() => {
            navigation.replace('SellerScreens');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Nuevo Producto</Text>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
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
          <Text>Cantidad</Text>
          <TextInput
            onChangeText={(value) => {
              setFieldValue('quantity', value);
            }}
            keyboardType={'numeric'}
            selectionColor={'#686565'}
            value={values.quantity}
          />
          <Text>{errors.quantity ? errors.quantity : ''}</Text>
        </View>

        <View>
          <Text>Precio</Text>
          <TextInput
            onChangeText={(value) => {
              setFieldValue('price', value);
            }}
            keyboardType={'numeric'}
            selectionColor={'#686565'}
            value={values.price}
          />
          <Text>{errors.price ? errors.price : ''}</Text>
        </View>

        <View>
          <Text>Estado</Text>
          <Pressable
            onPress={() => {
              LoadData.States().then((response) => {
                setOptions(response), setSelectVisible(true);
              });
            }}
          >
            <TextInput value={values.state} editable={false} />
          </Pressable>
          <Text>{errors.state ? errors.state : ''}</Text>
          <SelectItem
            setFieldValue={setFieldValue}
            setSelectVisible={setSelectVisible}
            visible={selectVisible}
            options={options}
          />
        </View>

        <View>
          <Text>Descripción</Text>
          <TextInput
            onChangeText={(value) => {
              setFieldValue('description', value);
            }}
            keyboardType={'default'}
            selectionColor={'#686565'}
            value={values.description}
            multiline
          />
          <Text>{errors.description ? errors.description : ''}</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }
          ]}
          onPress={() => handleSubmit()}
        >
          <Text>CONTINUAR</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewProduct;
