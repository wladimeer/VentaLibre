import { ScrollView, StyleSheet, Modal, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import React from 'react';

const SelectItem = function (props) {
  const { options, visible, setSelectVisible, setFieldValue } = props;

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.container}>
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    width: '100%'
  },
  contentData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  listItemData: {
    width: '100%',
    backgroundColor: '#2D2D30'
  },
  label: {
    fontSize: 16,
    fontFamily: 'Quicksand',
    color: '#FFFFFF'
  },
  separator: {
    height: 30
  }
});

export default SelectItem;
