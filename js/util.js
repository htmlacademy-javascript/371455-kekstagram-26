// модуль с вспомогательными функциями
const TIME_OUT_DELAY = 500;
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

//для устранения дребезга:
const debounce = (callback, timeoutDelay = TIME_OUT_DELAY) =>{
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {
  checkStringLength,
  getRandomPositiveInteger,
  getRandomArrayElement,
  isEscapeKey,
  debounce
};
