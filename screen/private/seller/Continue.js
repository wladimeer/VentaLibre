import { SafeAreaView, StatusBar } from 'react-native';
import { ScrollView, Pressable, View, Text, TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import AlertPro from 'react-native-alert-pro';
import Firebase from '../../../service/Firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-elements';
import SelectItem from '../../../components/SelectItem';
import LoadData from '../../../function/LoadData';
import { useFormik } from 'formik';
import FilePickerManager from 'react-native-file-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as yup from 'yup';

const Continue = ({ route, navigation }) => {
  const [selectVisible, setSelectVisible] = useState(false);
  const [options, setOptions] = useState([{}]);

  const message = useRef(null);
  const warning = useRef(null);
  const [text, setText] = useState('');

  const ContinueSchema = yup.object().shape({
    photos: yup
      .array()
      .nullable(true)
      .min(1, 'Debes Seleccionar fotos para el producto')
      .required('Debes Seleccionar fotos para el producto'),
    category: yup
      .string()
      .nullable(true)
      .required('Seleccionar una categoria para el producto')
  });

  const { values, setFieldValue, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      photos: [],
      category: ''
    },
    validationSchema: ContinueSchema,
    onSubmit: (values) => {
      setText('Publicando producto...');
      message.current.open();

      Firebase.CreateProduct(Object.assign(values, route.params.photoData))
        .then((response) => {
          setText(String(response));

          setFieldValue('photos', []);
          resetForm();

          setTimeout(() => {
            navigation.replace('SellerScreens');
            message.current.close();
            setText('');
          }, 2000);
        })
        .catch((response) => {
          setText(String(response));
          message.current.open();
        });
    }
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#8E8887' }}>
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

      <View>
        <Pressable
          onPress={() => {
            navigation.navigate('NewProduct');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Nuevo Producto</Text>
      </View>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Fotos</Text>
          <Pressable
            onPress={() => {
              FilePickerManager.showFilePicker(null, (response) => {
                if (response.fileName) {
                  if (
                    response.type === 'image/jpeg' ||
                    response.type === 'image/png'
                  ) {
                    const { photos } = values;
                    photos.push(response.uri);
                    setFieldValue('photos', photos);
                  }
                }
              });
            }}
          >
            <TextInput editable={false} placeholder="Seleccionar foto" />
          </Pressable>
          <Text style={{ color: 'white' }}>
            {errors.photos ? errors.photos : ''}
          </Text>
        </View>

        <View>
          {values.photos.map((photo, index) => {
            return (
              <Image
                key={index}
                style={{ width: 100, height: 100 }}
                source={{ uri: photo }}
              >
                <Pressable
                  onPress={() => {
                    const { photos } = values;
                    photos.splice(
                      photos.findIndex((p) => p === photo),
                      1
                    );

                    setFieldValue('photos', photos);
                  }}
                >
                  <AntDesign name="close" size={24} color="black" />
                </Pressable>
              </Image>
            );
          })}
        </View>

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
          <Text>PUBLICAR PRODUCTO</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Continue;
