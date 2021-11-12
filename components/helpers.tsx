import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

export const getCurrentDay = () => {
  return new Date().toDateString();
};

export const getCounter = () => {
  return Date.now().valueOf();
};
