import { Rating, AirbnbRating } from 'react-native-elements';
import { SafeAreaView, View, Text, Pressable } from 'react-native';
import React, { useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Firebase from '../../../service/Firebase';
import AlertPro from 'react-native-alert-pro';

const PurchaseCompleted = ({ route, navigation }) => {
  const [rating, setRating] = useState();
  const { seller, product, purchase } = route.params;
  const message = useRef(null);
  const [text, setText] = useState('');

  return (
    <SafeAreaView>
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
            navigation.replace('BuyerScreens');
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text>Compra Finalizada</Text>
      </View>

      <View>
        <Text>Gracias por haber comprado con VentaLibre</Text>

        <Pressable
          onPress={() => {
            Firebase.ValorateSeller({
              seller: seller,
              rating: rating
            })
              .then((response) => {
                setText(String(response));
                message.current.open();

                setTimeout(() => {
                  message.current.close();
                  navigation.replace('BuyerScreens');
                }, 2000);
              })
              .catch((response) => {
                setText(String(response));
                message.current.open();

                setTimeout(() => {
                  message.current.close();
                  navigation.replace('BuyerScreens');
                }, 2000);
              });
          }}
        >
          <Text>VALORAR VENDEDOR</Text>
        </Pressable>

        <Rating
          ratingColor="#3498db"
          ratingBackgroundColor="#000000"
          ratingCount={5}
          imageSize={25}
          // onFinishRating={1}
          style={{ paddingVertical: 10 }}
          startingValue={0}
          onFinishRating={(value) => {
            setRating(value);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PurchaseCompleted;
