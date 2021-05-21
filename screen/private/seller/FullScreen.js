import {
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Animated,
  StyleSheet,
  StatusBar
} from 'react-native';
import { Image, Card } from 'react-native-elements';
import React, { useRef } from 'react';

const FullScreen = ({ route, navigation }) => {
  const { fotos } = route.params;
  const { width, height } = Dimensions.get('screen');
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden={false} />
      <View style={StyleSheet.absoluteFillObject}>
        {fotos.map((foto, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
            outputRange: [0, 1, 0]
          });

          return (
            <Animated.Image
              key={index}
              source={{ uri: foto.url }}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={fotos}
        keyExtractor={(index) => index.id.toString()}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                navigation.navigate('ProductDetails');
              }}
            >
              <Image
                source={{ uri: item.url }}
                style={{
                  width: width - 20,
                  height: height,
                  maxWidth: width,
                  borderRadius: 5
                }}
                // PlaceholderContent={<ActivityIndicator />}
                resizeMode={'contain'}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default FullScreen;
