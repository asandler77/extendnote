import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DataType} from './types';

interface Props {
  data: DataType;
}

export default (props: Props) => {
  console.log('props', props);
  return (
    <View style={styles.container}>
      <Text>{props?.data?.day}</Text>
      <Text>{props?.data?.data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff8dc',
  },
});
