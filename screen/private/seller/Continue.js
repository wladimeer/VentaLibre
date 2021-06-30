import { Pressable, View, Text, TextInput } from 'react-native';
import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilePickerManager from 'react-native-file-picker';
import SelectItem from '../../../components/SelectItem';
import LoadData from '../../../function/LoadData';
import Firebase from '../../../service/Firebase';
import { Divider } from 'react-native-elements';
import React, { useRef, useState } from 'react';
import AlertPro from 'react-native-alert-pro';
import { Image } from 'react-native-elements';
import { useFormik } from 'formik';
import * as yup from 'yup';

const { width } = Dimensions.get('screen');

const Continue = ({ route, navigation }) => {
  const [text, setText] = useState('');

  const [selectVisible, setSelectVisible] = useState(false);

  const [options, setOptions] = useState([{}]);

  const message = useRef(null);
  const warning = useRef(null);

  const ContinueSchema = yup.object().shape({
    photos: yup
      .array()
      .nullable(true)
      .min(1, 'Debes Seleccionar fotos para el producto.')
      .required('Debes Seleccionar fotos para el producto.'),
    category: yup
      .string()
      .nullable(true)
      .required('Selecciona una categoría para el producto.')
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
      photos: [],
      category: ''
    },
    validationSchema: ContinueSchema,
    onSubmit: (values) => {
      setText('Publicando Producto...');
      message.current.open();

      Firebase.CreateProduct(Object.assign(values, route.params.photoData))
        .then((response) => {
          setText(String(response));

          setTimeout(() => {
            navigation.replace('SellerScreens');
          }, 2000);
        })
        .catch((response) => {
          setText(String(response));
          warning.current.open();
          return;
        });
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }} pointerEvents={'auto'}>
      <AlertPro
        ref={message}
        title="Atención"
        customStyles={design.message}
        showConfirm={false}
        showCancel={false}
        message={text}
      />

      <AlertPro
        ref={warning}
        title="Atención"
        textConfirm="ENTIENDO"
        onConfirm={() => warning.current.close()}
        customStyles={design.warning}
        showCancel={false}
        message={text}
      />

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
            navigation.navigate('NewProduct');
          }}
        >
          <Ionicons
            size={24}
            name="arrow-back"
            style={styles.iconsButton}
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
              <Text style={styles.textLabel}>Fotos</Text>
              <Pressable
                onPress={() => {
                  FilePickerManager.showFilePicker(null, (response) => {
                    if (response.fileName) {
                      if (
                        response.type == 'image/jpeg' ||
                        response.type == 'image/png'
                      ) {
                        const { photos } = values;
                        const array = photos.concat(response.uri);
                        setFieldValue('photos', array);
                      }
                    }

                    setFieldTouched('photos');
                  });
                }}
                style={{ width: '100%' }}
              >
                <TextInput
                  style={styles.textInput}
                  placeholder="Selecciona Foto"
                  placeholderTextColor="#353030"
                  editable={false}
                />
              </Pressable>
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.photos && errors.photos ? errors.photos : ''}
              </Text>
            </View>

            {values.photos.length > 0 ? (
              <View style={styles.imageList}>
                {values.photos.map((photo, index) => {
                  return (
                    <Image key={index} style={styles.image} source={{ uri: photo }}>
                      <Pressable
                        onPress={() => {
                          const { photos } = values;
                          const array = photos.filter((p) => p != photo);
                          setFieldValue('photos', array);
                        }}
                      >
                        <View style={styles.function}>
                          <View style={styles.buttonIcon}>
                            <AntDesign
                              size={22}
                              style={styles.icon}
                              color="#F1F1F1"
                              name="close"
                            />
                          </View>
                        </View>
                      </Pressable>
                    </Image>
                  );
                })}
              </View>
            ) : null}

            <Divider orientation="horizontal" style={styles.separator} />

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
                  value={values.category}
                  style={styles.textInput}
                  editable={false}
                />
              </Pressable>
              <Text style={(styles.textLabel, { color: '#FF5757' })}>
                {touched.category && errors.category ? errors.category : ''}
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
              <Text style={styles.textButton}>PUBLICAR PRODUCTO</Text>
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
  },
  imageList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#E4E2E2',
    flexWrap: 'wrap',
    borderRadius: 2,
    borderWidth: 1
  },
  image: {
    width: 98,
    height: 98,
    borderRadius: 2,
    margin: 1
  },
  function: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  buttonIcon: {
    width: 25,
    backgroundColor: '#E4E2E2',
    borderRadius: 15,
    height: 25
  },
  icon: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    borderColor: 'transparent',
    borderWidth: 1
  }
});

const design = {
  warning: {
    mask: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    container: {
      width: '80%',
      shadowOpacity: 0.1,
      shadowRadius: 10
    },
    title: {
      fontFamily: 'Quicksand-SemiBold'
    },
    message: {
      fontFamily: 'Quicksand-Regular'
    },
    buttonConfirm: {
      backgroundColor: '#957765',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 2
    },
    textConfirm: {
      color: '#FFFFFF',
      fontFamily: 'Quicksand-Regular',
      fontSize: 15
    }
  },
  message: {
    mask: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    container: {
      width: '80%',
      shadowOpacity: 0.1,
      shadowRadius: 10
    },
    title: {
      fontFamily: 'Quicksand-SemiBold'
    },
    message: {
      fontFamily: 'Quicksand-Regular'
    }
  }
};

export default Continue;
