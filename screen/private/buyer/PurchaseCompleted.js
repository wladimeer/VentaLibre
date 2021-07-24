import { StyleSheet, View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Rating, Divider } from 'react-native-elements';
import Firebase from '../../../service/Firebase';
import React, { useState, useRef } from 'react';
import AlertPro from 'react-native-alert-pro';

const PurchaseCompleted = ({ route, navigation }) => {
  const { seller } = route.params;

  const [text, setText] = useState('');

  const [rating, setRating] = useState();

  const message = useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AlertPro
        ref={message}
        title="Atención"
        customStyles={design.message}
        showConfirm={false}
        showCancel={false}
        message={text}
      />

      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.replace('BuyerScreens');
          }}
        >
          <Ionicons
            size={24}
            name="arrow-back"
            style={styles.iconsButton}
            color="black"
          />
        </Pressable>
        <Text style={styles.textTitle}>Compra Finalizada</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <View style={{ marginTop: 12 }}>
        <View style={{ marginHorizontal: 5 }}>
          <Text style={styles.message}>
            Gracias por haber comprado con VentaLibre
          </Text>
        </View>

        <View style={{ marginHorizontal: 5 }}>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? '#957765' : '#A17E68' },
              styles.largeButton
            ]}
            onPress={() => {
              if (rating > 0) {
                Firebase.ValorateSeller({
                  seller: seller,
                  rating: rating
                })
                  .then((response) => {
                    setText(String(response));
                    message.current.open();

                    setTimeout(() => {
                      navigation.replace('BuyerScreens');
                    }, 2000);
                  })
                  .catch((response) => {
                    setText(String(response));
                    message.current.open();

                    setTimeout(() => {
                      navigation.replace('BuyerScreens');
                    }, 2000);
                  });
              }
            }}
          >
            <Text style={styles.textButton}>VALORAR VENDEDOR</Text>
          </Pressable>
        </View>

        <Rating
          tintColor="#F2F2F2"
          ratingColor="#FFCA28"
          style={{ paddingVertical: 10 }}
          onFinishRating={(value) => {
            console.log(value);
            setRating(value);
          }}
          startingValue={0}
          ratingCount={5}
          imageSize={25}
        />
      </View>
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
  message: {
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center'
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'Quicksand-Regular',
    textAlignVertical: 'top',
    textAlign: 'center',
    fontSize: 15
  },
  largeButton: {
    width: '100%',
    borderRadius: 2,
    minWidth: 120,
    marginTop: 30,
    padding: 9
  }
});

const design = {
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

export default PurchaseCompleted;
