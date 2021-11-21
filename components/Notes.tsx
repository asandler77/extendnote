import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Carousel from './Carousel';
import {DataType} from './types';
import {getCounter, getCurrentDay} from './helpers';
import {
  getAllKeys,
  getMultiple,
  removeValue,
  storeData,
} from './AsyncStorageApis';
import MyButton from './MyButton';

/*


Should be fixed:
getDataFromAsync on second useEffect is work around solution for shown new added note,
but it might be replaced by better solution.
 */

export default ({navigation, route}: any) => {
  const [data, setData] = useState<DataType[] | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getDataFromAsync();
    setCounter(getCounter);
    return () => {};
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
        const onPressClearNote = clearNote;
        dataArray?.push({...dayNdata, key, onPressClearNote});
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
    dataObject.noteText = note;
    // dataObject.onPressClearNote = clearNote;

    storeDataOnAsync(dataObject);
  };

  const clearNote = (id: string) => {
    removeValue(id).then(getDataFromAsync);
  };

  const addNote = () => {
    navigation.navigate('CreateNote');
  };

  return (
    <SafeAreaView style={styles.container}>
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
