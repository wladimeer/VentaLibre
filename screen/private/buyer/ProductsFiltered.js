import { ActivityIndicator, View, Text, Pressable } from 'react-native';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Divider, Image, Card } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

const { width, height } = Dimensions.get('screen');

const ProductFiltered = ({ route, navigation }) => {
  const { products } = route.params;

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
        <Text style={styles.textTitle}>Productos Filtrados</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <ScrollView contentContainerStyle={{ flexDirection: 'column-reverse' }}>
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate('ProductDetails', {
                    user: product.user,
                    rating: product.rating,
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

export default ProductFiltered;
