export const getCurrentDay = () => {
  return new Date().toDateString();
};

export const getCounter = () => {
  const d = Date.now().valueOf();
  console.log('date', d);
  return d;
};
