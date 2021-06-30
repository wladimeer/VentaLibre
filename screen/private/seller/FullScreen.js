import { Dimensions, Animated, StyleSheet } from 'react-native';
import { View, Pressable, SafeAreaView } from 'react-native';
import React, { useRef } from 'react';

const { width, height } = Dimensions.get('screen');

const FullScreen = ({ route, navigation }) => {
  const { photos } = route.params;

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <View style={StyleSheet.absoluteFillObject}>
        {photos.map((photo, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
            outputRange: [0, 1, 0]
          });

          return (
            <Animated.Image
              key={index}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              source={{ uri: photo.url }}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        horizontal
        pagingEnabled
        data={photos}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.content}
            >
              <Animated.Image
                style={styles.image}
                source={{ uri: item.url }}
                resizeMode={'contain'}
              />
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: height,
    maxWidth: width,
    width: width - 20,
    borderRadius: 2
  }
});

export default FullScreen;
