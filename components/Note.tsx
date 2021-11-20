import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {DataType} from './types';

interface Props {
  data: DataType;
}

export default ({data}: Props) => {
  const {day, noteText, key, onPressClearNote} = data;
  const onPressDelete = (id: string | undefined) => {
    id && onPressClearNote && onPressClearNote(id);
  };
  return (
    <View style={styles.container}>
      <Text>{day}</Text>
      <Text>{noteText}</Text>
      <Text>{key}</Text>
      <Button title={'Delete'} onPress={() => onPressDelete(key)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff8dc',
    width: 150,
    padding: 5,
  },
});
