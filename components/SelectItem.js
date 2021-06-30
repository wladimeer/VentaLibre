import { ScrollView, StyleSheet, Modal, View, Animated } from 'react-native';
import { ListItem } from 'react-native-elements';
import React, { useState } from 'react';

const SelectItem = function (props) {
  const { options, visible, setSelectVisible, setFieldValue } = props;
  const opacity = useState(new Animated.Value(0))[0];

  Animated.timing(opacity, {
    toValue: 1,
    useNativeDriver: false,
    duration: 280
  }).start();

  return (
    <Modal transparent={true} visible={visible}>
      <Animated.View style={[styles.container, { opacity: opacity }]}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contentData}>
            {options.map((option, index) => {
              if (index + 1 < options.length) {
                return (
                  <ListItem
                    onPress={() => {
                      setFieldValue(option.key, option.value);
                      setSelectVisible(false);
                    }}
                    containerStyle={styles.listItemData}
                    bottomDivider
                    key={index}
                  >
                    <ListItem.Content>
                      <ListItem.Title style={styles.label}>
                        {option.value}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                );
              } else {
                return (
                  <ListItem
                    onPress={() => {
                      setFieldValue(option.key, option.value);
                      setSelectVisible(false);
                    }}
                    containerStyle={styles.listItemData}
                    key={index}
                  >
                    <ListItem.Content>
                      <ListItem.Title style={styles.label}>
                        {option.value}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                );
              }
            })}
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  scrollView: {
    width: '100%'
  },
  contentData: {
    flex: 1
  },
  listItemData: {
    width: '100%',
    backgroundColor: '#F2F2F2'
  },
  label: {
    fontSize: 16,
    fontFamily: 'Quicksand-Regular',
    color: '#353030'
  },
  separator: {
    height: 30
  }
});

export default SelectItem;
