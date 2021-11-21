import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {DataType} from './types';
import MyButton from './MyButton';

interface Props {
  data: DataType;
}

export default ({data}: Props) => {
  const {day, noteText, key, onPressClearNote} = data;
  const onPressDelete = (id: string | undefined) => {
    Alert.alert('Pay attention', 'The note will be deleted, are you sure???', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => id && onPressClearNote?.(id)},
    ]);
  };
  return (
    <View style={styles.container}>
      <Text>{day}</Text>
      <Text>{noteText}</Text>
      <MyButton
        text={'Delete Note'}
        customTextStyle={styles.text}
        customButtonStyle={styles.button}
        onPress={() => onPressDelete(key)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff8dc',
    width: 150,
    padding: 5,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#f08080',
    borderRadius: 10,
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});
