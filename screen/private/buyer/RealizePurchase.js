import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import { WebpayPlus } from 'transbank-sdk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState, useRef } from 'react';
import AlertPro from 'react-native-alert-pro';
import Firebase from '../../../service/Firebase';
// const Transbank = require('transbank-sdk').WebpayPlus;

const RealizePurchase = ({ route, navigation }) => {
  const { user, purchase, commerce, product } = route.params;
  const [response, setResponse] = useState({ token: '', url: '' });
  const [state, setState] = useState(false);
  const [finish, setFinish] = useState(false);
  const message = useRef(null);
  const [text, setText] = useState('');
  const compare = {
    url: 'https://webpay3gint.transbank.cl/webpayserver/auth_emisor.cgi',
    url2: 'https://webpay3gint.transbank.cl/webpayserver/dist/#',
    title: 'Pago Seguro WebPay'
  };

  useEffect(async () => {
    const response = await WebpayPlus.Transaction.create(
      'S' + String(Math.floor(Math.random() * 9999999)),
      'O' + String(Math.floor(Math.random() * 9999999)),
      purchase.totalPrice,
      'https://www.google.com'
    );

    setResponse({
      token: response.token,
      url: response.url
    });
  }, []);

  if (finish) {
    WebpayPlus.Transaction.commit(response.token).then((response) => {
      if (response.status == 'AUTHORIZED') {
        Firebase.CreatePurchase({
          product: product,
          totalPrice: purchase.totalPrice,
          quantity: purchase.quantity,
          seller: user
        })
          .then((response) => {
            navigation.navigate('PurchaseCompleted', {
              product: product,
              purchase: purchase,
              seller: user
            });
          })
          .catch((response) => {
            setText(String(response));
            message.current.open();
          });
      }
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <Text>Comprando con Webpay</Text>
      </View>
      <View style={{ flex: 1 }}>
        {!finish ? (
          <>
            {!state ? (
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              >
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            ) : null}
            <WebView
              source={{
                html: `
                <form method="post" action="${response.url}" id="form">
                  <input type="hidden" name="token_ws"
                    value="${response.token}"
                  />
                </form>

                <script>
                  document.getElementById("form").submit();
                </script>
              `
              }}
              onNavigationStateChange={(value) => {
                if (value.title == compare.title) {
                  setState(true);
                }

                if (value.url == compare.url2) {
                  navigation.replace('BuyerScreens');
                }

                if (value.url == compare.url) {
                  setFinish(true);
                }
              }}
            />
          </>
        ) : (
          <ActivityIndicator size="large" color="#00ff00" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default RealizePurchase;
