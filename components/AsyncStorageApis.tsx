import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllKeys = async (): Promise<string[] | undefined> => {
  // let keys: string[] = [];
  try {
    return await AsyncStorage.getAllKeys();
    // setKeys(keys);
  } catch (e) {
    // read key error
  }
};

export const getMultiple = async (keys: string[]) => {
  try {
    console.log('getMultiple keys,...', keys);
    return await AsyncStorage.multiGet(keys);
  } catch (e) {
    // read error
  }
};
