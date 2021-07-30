import { ActivityIndicator, View, Text, Pressable } from 'react-native';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Divider, Image, Card } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import Firebase from '../../../service/Firebase';
import PriceFormat from 'price-text-format';

const { width, height } = Dimensions.get('screen');

const ViewPurchases = ({ navigation }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    Firebase.ReadPurchases().then((response) => {
      setList(response);
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }} pointerEvents={'auto'}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.replace('BuyerScreens');
          }}
        >
          <Ionicons
            size={24}
            style={styles.iconsButton}
            name="arrow-back"
            color="black"
          />
        </Pressable>
        <Text style={styles.textTitle}>Compras</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <ScrollView contentContainerStyle={{ flexDirection: 'column-reverse' }}>
        {list.length > 0 ? (
          list.map((purchase, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate('PurchaseDetails', { purchase: purchase });
                }}
                style={styles.content}
              >
                <Card containerStyle={styles.card}>
                  <View style={{ width: width - 20 }}>
                    <View style={styles.boxContent}>
                      <Image
                        style={styles.image}
                        source={{ uri: purchase.product.photos[0].url }}
                        PlaceholderContent={
                          <ActivityIndicator size="large" color="#957765" />
                        }
                        resizeMode={'cover'}
                      />
                    </View>
                    <View style={styles.labels}>
                      <Text style={styles.textInitial}>
                        ${PriceFormat(purchase.totalPrice)}
                      </Text>
                      <Text style={styles.textSecond}>{purchase.product.name}</Text>
                    </View>
                  </View>
                </Card>
              </Pressable>
            );
          })
        ) : (
          <View style={styles.information}>
            <Text style={{ color: '#626262' }}>No Se Encontraron Compras</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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

export default ViewPurchases;
