// Функция, возвращающая случайное целое число из переданного диапазона включительно
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function createRandom(min, max) {
  if (min >= 0 && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  throw Error('Неверный диапазон чисел. Попробуйте ввести заново!');
}

createRandom(0, 300);

// Функция для проверки максимальной длины строки.

function checkStringLength (currentString, maxLenght) {
  return currentString.length <= maxLenght;
}

checkStringLength('all you need is love', 12);
