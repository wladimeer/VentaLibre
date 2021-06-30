import { ActivityIndicator, TextInput } from 'react-native';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Divider, Image, Card } from 'react-native-elements';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Firebase from '../../../service/Firebase';
import { Keyboard } from 'react-native';

const { width, height } = Dimensions.get('screen');

const ViewProducts = ({ navigation }) => {
  const [find, setFind] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    Firebase.ReadProducts().then((response) => {
      setList(response);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navigation}>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              navigation.openDrawer();
            }}
          >
            <EvilIcons
              size={35}
              style={styles.iconsButton}
              color="#353030"
              name="navicon"
            />
          </Pressable>

          <Text style={styles.textTitle}>VentaLibre</Text>
        </View>

        <View style={styles.navigation}>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => {
              Firebase.SearchProducts(value).then((response) => {
                setFind(response);
              });
            }}
            placeholder="Ingresa para Buscar"
            placeholderTextColor="#626262"
            selectionColor={'#686565'}
          />

          <Pressable
            onPress={() => {
              navigation.navigate('ReduceProducts');
            }}
          >
            <Feather
              size={25}
              style={styles.iconsButton}
              color="#353030"
              name="filter"
            />
          </Pressable>
        </View>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <ScrollView>
        {find.length > 0 ? (
          find.map((product, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate('ProductDetails', {
                    product: product
                  });
                }}
                style={styles.content}
              >
                <Card containerStyle={styles.card}>
                  <View style={{ width: width - 20 }}>
                    <View style={styles.boxContent}>
                      <Image
                        style={styles.image}
                        source={{ uri: product.photos[0].url }}
                        PlaceholderContent={
                          <ActivityIndicator size="large" color="#957765" />
                        }
                        resizeMode={'cover'}
                      />
                    </View>
                    <View style={styles.labels}>
                      <Text style={styles.textInitial}>${product.price}</Text>
                      <Text style={styles.textSecond}>{product.name}</Text>
                    </View>
                  </View>
                </Card>
              </Pressable>
            );
          })
        ) : list.length > 0 ? (
          list.map((product, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate('ProductDetails', {
                    product: product
                  });
                }}
                style={styles.content}
              >
                <Card containerStyle={styles.card}>
                  <View style={{ width: width - 20 }}>
                    <View style={styles.boxContent}>
                      <Image
                        style={styles.image}
                        source={{ uri: product.photos[0].url }}
                        PlaceholderContent={
                          <ActivityIndicator size="large" color="#957765" />
                        }
                        resizeMode={'cover'}
                      />
                    </View>
                    <View style={styles.labels}>
                      <Text style={styles.textInitial}>${product.price}</Text>
                      <Text style={styles.textSecond}>{product.name}</Text>
                    </View>
                  </View>
                </Card>
              </Pressable>
            );
          })
        ) : (
          <View style={styles.information}>
            <Text style={{ color: '#626262' }}>No Se Encontraron Publicaciones</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconsButton: {
    borderColor: '#F2F2F2',
    textAlignVertical: 'bottom',
    borderWidth: 1
  },
  textTitle: {
    textAlignVertical: 'top',
    fontFamily: 'Quicksand-Regular',
    borderColor: '#F2F2F2',
    borderWidth: 1,
    fontSize: 22
  },
  textInput: {
    color: '#353030',
    backgroundColor: '#FCFCFC',
    fontFamily: 'Quicksand-Regular',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 8,
    fontSize: 12,
    width: 130
  },
  divider: {
    width: '100%',
    backgroundColor: '#787373',
    borderWidth: 0.3,
    marginTop: 0
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    width: width
  },
  card: {
    borderColor: '#D2D5DD',
    backgroundColor: '#FCFCFC',
    borderRadius: 5,
    padding: 0,
    margin: 0
  },
  boxContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  image: {
    width: width - 20,
    height: height - 600,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  labels: {
    paddingHorizontal: 5,
    paddingVertical: 12
  },
  textInitial: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    color: '#202020'
  },
  textSecond: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    color: '#626262'
  },
  information: {
    display: 'flex',
    marginTop: width - 24,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ViewProducts;
