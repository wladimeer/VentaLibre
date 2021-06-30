import { Pressable, View, Text, TextInput } from 'react-native';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectItem from '../../../components/SelectItem';
import LoadData from '../../../function/LoadData';
import Firebase from '../../../service/Firebase';
import { Divider } from 'react-native-elements';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const { width } = Dimensions.get('screen');

const ReduceProducts = ({ navigation }) => {
  const [options, setOptions] = useState([{}]);

  const [selectVisible, setSelectVisible] = useState(false);

  const ReduceProductSchema = yup.object().shape({
    category: yup
      .string()
      .nullable(true)
      .required('Selecciona una categoría para filtrar.')
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
        <Text style={styles.textTitle}>Filtrar Productos</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={styles.textLabel}>Categoría</Text>
              <Pressable
                onPress={() => {
                  setFieldTouched('category');
                  LoadData.Categories().then((response) => {
                    setOptions(response), setSelectVisible(true);
                  });
                }}
                style={{ width: '100%' }}
              >
                <TextInput
                  style={styles.textInput}
                  value={values.category}
                  editable={false}
                />
              </Pressable>
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.category && errors.category ? errors.category : ''}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? '#957765' : '#A17E68' },
                styles.button
              ]}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textButton}>APLICAR FILTRO</Text>
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

export default ReduceProducts;
