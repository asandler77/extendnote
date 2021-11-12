import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from './Carousel';
import {DataType} from './types';
import {clearAll, getCounter, getCurrentDay} from './helpers';

export default ({navigation, route}: any) => {
  const [data, setData] = useState<DataType[] | null>(null);
  const [counter, setCounter] = useState(0);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    initData();
    setCounter(getCounter);
  }, []);

  useEffect(() => {
    createData(route.params?.data);
  }, [route.params?.data]);

  const initData = async () => {
    return await getAllKeys().then(getMultiple);
  };

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem(`@-${counter}`, jsonValue);
      setCounter(counter + 1);
    } catch (e) {
      // saving error
    }
  };

  const getMultiple = async () => {
    let values;
    let dataArray: any[] = [];
    try {
      values = await AsyncStorage.multiGet(keys);

      values.forEach(value => {
        if (value[1]) {
          dataArray?.push(JSON.parse(value[1]));
        }
      });
    } catch (e) {
      // read error
    }

    setData(dataArray);
  };

  const createData = (note: string) => {
    if (!note) return;
    let dataObject: DataType = {};

    dataObject.day = getCurrentDay();
    dataObject.data = note;

    storeData(dataObject);
  };

  const getAllKeys = async () => {
    let keys: string[] = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      setKeys(keys);
    } catch (e) {
      // read key error
    }
  };

  const addNote = () => {
    navigation.navigate('CreateNote');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Enter Note</Text>
      <Button title="Show data on Async" onPress={getMultiple} />
      <Button title="getAllKeys" onPress={getAllKeys} />
      <Button title="clearAll" onPress={clearAll} />
      <Button title="Add note" onPress={addNote} />
      <Carousel data={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    height: 40,
    borderRadius: 50,
    width: 300,
  },
});
