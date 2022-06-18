
// Функция для проверки максимальной длины строки.

const checkStringLength = (string, length) => (string.length <= length);

console.log(checkStringLength);

//создаем пост пользователя

const POST_COUNT = 25;

const DESCRIPTIONS = [
  'Я поел',
  'Я пошел гулять',
  'Вкусное мясо',
  'Классное небо сегодня',
  'Дай поесть мне!',
  'Кто со мной на озеро?',
  'Вот мои игрушки',
];

const NAMES = [
  'Шарик Мясной',
  'Бобик Лысый',
  'Мурка Леонидовна',
  'Веник Каминный',
  'Черныш Заморский',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// возвращает случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length -1)];

// создаем комментарий к посту - фотографии пользователя
const createComment = () => ({
  id: getRandomPositiveInteger(0, 10000),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

//создаем обьект - фотографию - пост пользователя
const createPost =  (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: createComment(),
});

//создаем массив из 25 постов пользователя
const createPostGroup = Array.from({length: POST_COUNT}, (_, i) => createPost(i));

console.log(createPostGroup);
