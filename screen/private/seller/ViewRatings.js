import { ScrollView, Dimensions, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider, Card } from 'react-native-elements';
import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Firebase from '../../../service/Firebase';

const { width } = Dimensions.get('screen');

const ViewRatings = ({ navigation }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    Firebase.ReadRatings().then((response) => {
      setList(response);
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }} pointerEvents={'auto'}>
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
        <Text style={styles.textTitle}>Valoraciones</Text>
      </View>

      <Divider orientation="horizontal" style={styles.divider} />

      <ScrollView contentContainerStyle={{ flexDirection: 'column-reverse' }}>
        {list.length > 0 ? (
          <View style={styles.container}>
            {list.map((rating, index) => {
              return (
                <View style={styles.content} key={index}>
                  <Card containerStyle={styles.card}>
                    <View style={styles.textGroup}>
                      <Text style={styles.textLabel}>Nombre:</Text>
                      <Text style={styles.textValue}>{rating.buyer.name}</Text>
                    </View>

                    <View style={styles.textGroup}>
                      <Text style={styles.textLabel}>Correo:</Text>
                      <Text style={styles.textValue}>{rating.buyer.email}</Text>
                    </View>

                    <View style={styles.textGroup}>
                      <Text style={styles.textLabel}>Valoración:</Text>
                      <Text style={styles.textValue}>{rating.rating}/5</Text>
                    </View>
                  </Card>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.information}>
            <Text style={{ color: '#626262' }}>No Se Encontraron Valoraciones</Text>
          </View>
        )}
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
    marginVertical: 5,
    width: width - 20
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
  card: {
    borderColor: '#D2D5DD',
    backgroundColor: '#FCFCFC',
    borderRadius: 5,
    padding: 5,
    margin: 0
  },
  textLabel: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    color: '#202020'
  },
  textValue: {
    fontSize: 15,
    marginLeft: 2,
    fontFamily: 'Quicksand-Regular',
    color: '#626262'
  },
  textGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  information: {
    display: 'flex',
    marginTop: width - 24,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ViewRatings;
