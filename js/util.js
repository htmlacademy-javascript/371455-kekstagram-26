// модуль с вспомогательными функциями

// если нажатая клавиша - Esc

const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция для проверки максимальной длины строки.
const checkStringLength = (string, length) => (string.length <= length);

// Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// возвращает случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length -1)];

const debounce = (callback, delay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(
      () => callback.apply(this, rest), delay
    );
  };
};


export {
  checkStringLength,
  getRandomPositiveInteger,
  getRandomArrayElement,
  isEscapeKey,
  debounce
};
