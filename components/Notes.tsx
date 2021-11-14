import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Carousel from './Carousel';
import {DataType} from './types';
import {getCounter, getCurrentDay} from './helpers';
import {clearAll, getAllKeys, getMultiple, storeData} from './AsyncStorageApis';
import MyButton from './MyButton';

/*
Known bugs:
1. The first added note doesn't shown.
2. Some times last added note appear twice after close and open the app.

Should be fixed:
getKeys on seconf useffect is work around solution for shown new added note,
but it might be replaced by better solution.
 */

export default ({navigation, route}: any) => {
  const [data, setData] = useState<DataType[] | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getDataFromAsync();
    setCounter(getCounter);
  }, []);

  useEffect(() => {
    createData(route.params?.data);
    getDataFromAsync();
  }, [route.params?.data]);

  const storeDataOnAsync = (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      storeData(counter, jsonValue);
      setCounter(counter + 1);
    } catch (e) {
      console.log('error', e);
    }
  };

  const saveData = (values: [string, string | null][]) => {
    let dataArray: DataType[] = [];
    values.forEach(value => {
      if (value[1]) {
        const key = value[0];
        const dayNdata = JSON.parse(value[1]);
        dataArray?.push({...dayNdata, key});
      }
    });
    setData(dataArray);
  };




  const getDataFromAsync = async () => {
    return new Promise((resolve, reject) => {
      getAllKeys()
        .then(keys => {
          if (keys) {
            getMultiple(keys).then(values => {
              if (values) {
                console.log('values', values);
                saveData(values);
              }
            });
          }
        })
        .catch(error => reject(error));
    });
  };

  const createData = (note: string) => {
    if (!note) return;
    let dataObject: DataType = {};

    dataObject.day = getCurrentDay();
    dataObject.data = note;

    storeDataOnAsync(dataObject);
  };

  const addNote = () => {
    navigation.navigate('CreateNote');
  };

  const clearAllDataOnAsync = async () => {
    return new Promise((resolve, reject) => {
      clearAll()
        .then(() => {
          resolve(getDataFromAsync());
        })
        .catch(error => reject(error));
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyButton
        text={'Clear All'}
        customTextStyle={styles.text}
        customButtonStyle={styles.button}
        onPress={clearAllDataOnAsync}
      />
      <MyButton
        text={'Add Note'}
        customTextStyle={styles.text}
        customButtonStyle={styles.button}
        onPress={addNote}
      />
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
