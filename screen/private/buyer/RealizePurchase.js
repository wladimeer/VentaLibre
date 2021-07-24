import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Firebase from '../../../service/Firebase';
import { Divider } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import AlertPro from 'react-native-alert-pro';

const RealizePurchase = ({ route, navigation }) => {
  const { user, purchase, commerce, product } = route.params;

  const [text, setText] = useState('');
  const [finish, setFinish] = useState(false);
  const [state, setState] = useState(false);

  const [response, setResponse] = useState({ token: '', url: '' });

  const warning = useRef(null);

  const compare = {
    return: 'https://www.google.com/',
    finish: 'https://webpay3gint.transbank.cl/webpayserver/auth_emisor.cgi',
    ready: 'Pago Seguro WebPay'
  };

  useEffect(() => {
    fetch('https://transbank-service.herokuapp.com/create', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ purchase: { totalPrice: 15000 } })
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((value) => {
            setResponse({
              token: value.token,
              url: value.url
            });
          });
        }
      })
      .catch((response) => {
        setText('Transbank Dejo de Funcionar!');
        warning.current.open();
        return;
      });
  }, []);

  if (finish) {
    fetch('https://transbank-service.herokuapp.com/status', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: { token: response.token } })
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((value) => {
            if (value.success != null) {
              Firebase.CreatePurchase({
                product: product,
                totalPrice: purchase.totalPrice,
                quantity: purchase.quantity,
                seller: user
              })
                .then((response) => {
                  navigation.navigate('PurchaseCompleted', {
                    seller: user
                  });
                })
                .catch((response) => {
                  if (text == '') {
                    setText(String(response));
                    warning.current.open();
                    return;
                  }
                });
            }

            if (value.error != null) {
              if (text == '') {
                setText(String(value.error));
                warning.current.open();
                return;
              }
            }
          });
        }
      })
      .catch((response) => {
        setText('Transbank Dejo de Funcionar!');
        warning.current.open();
        return;
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      <AlertPro
        ref={warning}
        title="Atención"
        textConfirm="VOLVER A PRODUCTOS"
        onConfirm={() => {
          warning.current.close();

          setTimeout(() => {
            navigation.replace('BuyerScreens');
          }, 500);
        }}
        customStyles={design.warning}
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
        <Text style={styles.textTitle}>Completa tu Compra</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <View style={{ flex: 1 }}>
        {!finish ? (
          <>
            {!state ? (
              <View style={styles.indicator}>
                <ActivityIndicator size="large" color="#957765" />
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
                if (value.title == compare.ready) {
                  setState(true);
                  return;
                }

                if (value.url == compare.return) {
                  navigation.replace('BuyerScreens');
                  return;
                }

                if (value.url == compare.finish) {
                  setFinish(true);
                  return;
                }
              }}
            />
          </>
        ) : (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color="#957765" />
          </View>
        )}
      </View>
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
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
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
  }
};

export default RealizePurchase;
