export const getCurrentDay = () => {
  return new Date().toDateString();
};

export const getCounter = () => {
  return Date.now().valueOf();
};
