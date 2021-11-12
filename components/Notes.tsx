import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
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
      <TouchableOpacity style={styles.button} onPress={getMultiple}>
        <Text style={styles.text}> Show data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getAllKeys}>
        <Text style={styles.text}> Get Keys</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={clearAll}>
        <Text style={styles.text}> Clear All</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={addNote}>
        <Text style={styles.text}> Add Note</Text>
      </TouchableOpacity>
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
  button: {
    justifyContent: 'center',
    backgroundColor: '#ffd700',
    margin: 15,
    borderRadius: 10,
    width: 150,
    height: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
  },
});
