import {removeValue} from './AsyncStorageApis';

export const getCurrentDay = () => {
  return new Date().toDateString();
};

export const getCounter = () => {
  const d = Date.now().valueOf();
  console.log('date', d);
  return d;
};

export const clearNote = (id: string) => {
  return new Promise((resolve, reject) => {
    removeValue(id).then();
  });
};
