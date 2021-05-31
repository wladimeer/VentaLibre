import {
  View,
  Pressable,
  Dimensions,
  Animated,
  StyleSheet,
  StatusBar,
  SafeAreaView
} from 'react-native';
import React, { useRef } from 'react';

const FullScreen = ({ route, navigation }) => {
  const { photos } = route.params;
  const { width, height } = Dimensions.get('screen');
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden={false} />
      <View style={StyleSheet.absoluteFillObject}>
        {photos.map((photo, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
            outputRange: [0, 1, 0]
          });

          return (
            <Animated.Image
              key={index}
              source={{ uri: photo.url }}
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
        data={photos}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Animated.Image
                source={{ uri: item.url }}
                style={{
                  width: width - 20,
                  height: height,
                  maxWidth: width,
                  borderRadius: 5
                }}
                resizeMode={'contain'}
              />
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default FullScreen;
