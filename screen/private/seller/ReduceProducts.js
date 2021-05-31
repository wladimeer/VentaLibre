import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ScrollView, Pressable, View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectItem from '../../../components/SelectItem';
import LoadData from '../../../function/LoadData';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Firebase from '../../../service/Firebase';

const ReduceProducts = ({ navigation }) => {
  const [selectVisible, setSelectVisible] = useState(false);
  const [options, setOptions] = useState([{}]);

  const ReduceProductSchema = yup.object().shape({
    category: yup
      .string()
      .nullable(true)
      .required('Seleccionar una categoria para filtrar')
  });

  const { values, setFieldValue, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      category: ''
    },
    validationSchema: ReduceProductSchema,
    onSubmit: (values) => {
      Firebase.FilterProducts(values.category).then((response) => {
        navigation.navigate('ProductsFiltered', { products: response });
      });
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
        <Text>Filtrar Productos</Text>
      </View>

      <ScrollView>
        <View>
          <Text>Categoria</Text>
          <Pressable
            onPress={() => {
              LoadData.Categories().then((response) => {
                setOptions(response), setSelectVisible(true);
              });
            }}
          >
            <TextInput value={values.category} editable={false} />
          </Pressable>
          <Text style={{ color: 'white' }}>
            {errors.category ? errors.category : ''}
          </Text>
          <SelectItem
            setFieldValue={setFieldValue}
            setSelectVisible={setSelectVisible}
            visible={selectVisible}
            options={options}
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            { backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'transparent' }
          ]}
          onPress={() => handleSubmit()}
        >
          <Text>APLICAR FILTRO</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReduceProducts;
