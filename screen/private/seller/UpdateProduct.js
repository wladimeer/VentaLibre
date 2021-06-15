import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ScrollView, Pressable, View, Text, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import AlertPro from 'react-native-alert-pro';
import Firebase from '../../../service/Firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import * as yup from 'yup';

const UpdateProduct = ({ route, navigation }) => {
  const message = useRef(null);
  const { product } = route.params;
  const [text, setText] = useState('');

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
      name: String(product.name),
      quantity: String(product.quantity),
      price: String(product.price)
    },
    validationSchema: UpdateProductSchema,
    onSubmit: (values) => {
      Firebase.UpdateProduct(Object.assign(values, { uid: product.uid }))
        .then((response) => {
          setText(String(response));
          message.current.open();

          setTimeout(() => {
            navigation.replace('SellerScreens');
          }, 2000);
        })
        .catch((response) => {});
    }
  });

  return (
    <SafeAreaView>
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

      <View>
        <Pressable
          onPress={() => {
            navigation.navigate('ProductDetails');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Actualizar Producto</Text>
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

        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }
          ]}
          onPress={() => handleSubmit()}
        >
          <Text>ACTUALIZAR PRODUCTO</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProduct;
