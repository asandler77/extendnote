import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllKeys = async (): Promise<string[] | undefined> => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log('error', e);
  }
};

export const storeData = async (counter: number, value: any) => {
  try {
    await AsyncStorage.setItem(`@-${counter}`, value);
  } catch (e) {
    console.log('error', e);
  }
};

export const getMultiple = async (keys: string[]) => {
  try {
    return await AsyncStorage.multiGet(keys);
  } catch (e) {
    console.log('error', e);
  }
};

export const clearAll = async () => {
  try {
    console.log('clearAll');

    await AsyncStorage.clear();
  } catch (e) {
    console.log('error', e);
  }
};

export const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
  console.log('Value is removed');
};
