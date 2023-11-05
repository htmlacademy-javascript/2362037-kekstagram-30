export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

export const createId = () => {
  let lastId = 0;

  return () => {
    lastId += 1;
    return lastId;
  };
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
