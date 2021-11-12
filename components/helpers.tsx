import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};

export const getCurrentDay = () => {
  return new Date().toDateString();
};

export const getCounter = () => {
  return Date.now().valueOf();
};
