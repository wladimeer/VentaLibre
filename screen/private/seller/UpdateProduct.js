import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ScrollView, Pressable, View, Text, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import AlertPro from 'react-native-alert-pro';
import Firebase from '../../service/Firebase';
import { useFormik } from 'formik';
import * as yup from 'yup';

const UpdateProduct = ({ route, navigation }) => {
  const message = useRef(null);

  const UpdateProductSchema = yup.object().shape({
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
      .required('Ingresar un precio para el producto')
  });

  const { values, setFieldValue, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      name: '',
      quantity: '',
      price: ''
    },
    validationSchema: UpdateProductSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default UpdateProduct;
