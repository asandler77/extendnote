import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Carousel from './Carousel';
import {DataType} from './types';
import {getCounter, getCurrentDay} from './helpers';
import {clearAll, getAllKeys, getMultiple, storeData} from './AsyncStorageApis';

export default ({navigation, route}: any) => {
  const [data, setData] = useState<DataType[] | null>(null);
  const [counter, setCounter] = useState(0);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    getKeys();
    setCounter(getCounter);
  }, []);

  useEffect(() => {
    if (keys.length > 0) {
      getStoredData();
    }
  }, [keys]);

  useEffect(() => {
    createData(route.params?.data);
  }, [route.params?.data]);

  const storeDataOnAsync = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      storeData(counter, jsonValue);
      setCounter(counter + 1);
    } catch (e) {
      console.log('error', e);
    }
  };

  const saveData = (values: [string, string | null][]) => {
    let dataArray: any[] = [];
    values.forEach(value => {
      if (value[1]) {
        dataArray?.push(JSON.parse(value[1]));
      }
    });
    setData(dataArray);
  };

  const getStoredData = () => {
    return new Promise((resolve, reject) => {
      getMultiple(keys).then(values => {
        if (values && values.length > 0) {
          resolve(saveData(values));
        } else {
          reject(console.error('getStoredData error'));
        }
      });
    });
  };

  const createData = (note: string) => {
    if (!note) return;
    let dataObject: DataType = {};

    dataObject.day = getCurrentDay();
    dataObject.data = note;

    storeDataOnAsync(dataObject);
  };

  const getKeys = () => {
    return new Promise((resolve, reject) => {
      getAllKeys().then(keys => {
        if (keys && keys.length > 0) {
          setKeys(keys);
        } else {
          reject(console.log('getKeys error'));
        }
      });
    });
  };

  const addNote = () => {
    navigation.navigate('CreateNote');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={getStoredData}>
        <Text style={styles.text}> Show data</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getKeys}>
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
    width: 250,
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
